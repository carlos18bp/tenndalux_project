/**
 * Editor de bloques del admin.
 *
 * Hace tres cosas: entrega las instrucciones para la IA, revisa el JSON sin
 * guardar, y sube las fotos de las galerías comprimidas y de a una.
 */
(function () {
  'use strict';

  // nginx corta en 10 MB por petición y una foto de celular pesa 3-8 MB, así
  // que subir varias juntas la revienta. Cada una se comprime por debajo de
  // este techo y viaja en su propia petición.
  var MAX_BYTES = 1000 * 1000;
  var MAX_DIMENSION = 2000;
  var QUALITIES = [0.85, 0.75, 0.65, 0.55, 0.45, 0.35];

  function csrfToken() {
    var match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  }

  function subject() {
    var title = document.getElementById('id_title');
    return title && title.value ? title.value.trim() : '';
  }

  function instructionsUrl(editor, download) {
    var url = editor.dataset.instructionsUrl
      + '?kind=' + encodeURIComponent(editor.dataset.kind)
      + '&subject=' + encodeURIComponent(subject());
    return download ? url + '&download=1' : url;
  }

  function status(editor, message, kind) {
    var node = editor.querySelector('[data-cb-status]');
    node.textContent = message || '';
    node.className = 'cb-status' + (kind ? ' cb-status--' + kind : '');
  }

  /** Redibuja la foto reducida y baja la calidad hasta que entre en MAX_BYTES. */
  function compress(file) {
    return new Promise(function (resolve, reject) {
      var image = new Image();
      var objectUrl = URL.createObjectURL(file);

      image.onload = function () {
        URL.revokeObjectURL(objectUrl);

        var scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
        var canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

        var attempt = 0;
        (function next() {
          if (attempt >= QUALITIES.length) {
            // Se manda igual: el servidor rechaza por encima de 2 MB y avisa.
            canvas.toBlob(resolve, 'image/webp', QUALITIES[QUALITIES.length - 1]);
            return;
          }
          canvas.toBlob(function (blob) {
            if (!blob) { reject(new Error('El navegador no pudo procesar la imagen.')); return; }
            if (blob.size <= MAX_BYTES) { resolve(blob); return; }
            attempt += 1;
            next();
          }, 'image/webp', QUALITIES[attempt]);
        })();
      };

      image.onerror = function () {
        URL.revokeObjectURL(objectUrl);
        reject(new Error('No parece ser una imagen.'));
      };

      image.src = objectUrl;
    });
  }

  function addImageRow(editor, data) {
    var row = document.createElement('li');
    row.className = 'cb-images__item';

    var thumb = document.createElement('img');
    thumb.src = data.url;
    thumb.alt = '';
    thumb.loading = 'lazy';

    var id = document.createElement('code');
    id.textContent = data.public_id;

    var copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'cb-button cb-button--small';
    copy.textContent = 'Copiar id';
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText(data.public_id).then(function () {
        copy.textContent = 'Copiado';
        setTimeout(function () { copy.textContent = 'Copiar id'; }, 1500);
      });
    });

    row.appendChild(thumb);
    row.appendChild(id);
    row.appendChild(copy);
    editor.querySelector('[data-cb-images]').appendChild(row);
  }

  function uploadOne(editor, blob, name) {
    var body = new FormData();
    body.append('image', blob, name.replace(/\.[^.]+$/, '') + '.webp');

    return fetch(editor.dataset.uploadUrl, {
      method: 'POST',
      body: body,
      credentials: 'same-origin',
      headers: { 'X-CSRFToken': csrfToken() },
    }).then(function (response) {
      return response.json().then(function (data) {
        if (!response.ok) { throw new Error(data.error || 'Falló la subida.'); }
        return data;
      });
    });
  }

  /** Una foto por petición, en serie: si la séptima falla, las seis anteriores ya están. */
  function uploadSequentially(editor, files) {
    var box = editor.querySelector('[data-cb-progress]');
    var fill = editor.querySelector('[data-cb-progress-fill]');
    var label = editor.querySelector('[data-cb-progress-label]');
    var failures = [];

    box.hidden = false;

    return files.reduce(function (chain, file, index) {
      return chain.then(function () {
        label.textContent = 'Subiendo ' + (index + 1) + ' de ' + files.length + ': ' + file.name;
        fill.style.width = Math.round((index / files.length) * 100) + '%';

        return compress(file)
          .then(function (blob) { return uploadOne(editor, blob, file.name); })
          .then(function (data) { addImageRow(editor, data); })
          .catch(function (error) { failures.push(file.name + ': ' + error.message); });
      });
    }, Promise.resolve()).then(function () {
      fill.style.width = '100%';
      label.textContent = '';
      box.hidden = true;

      if (failures.length) {
        status(editor, 'No se pudieron subir ' + failures.length + ' foto(s). ' + failures.join(' | '), 'error');
      } else {
        status(editor, files.length + ' foto(s) subidas. Copia los ids al bloque «galeria».', 'ok');
      }
    });
  }

  function wire(editor) {
    var textarea = editor.querySelector('textarea');

    editor.querySelector('[data-cb-copy]').addEventListener('click', function () {
      status(editor, 'Preparando…');
      fetch(instructionsUrl(editor, false), { credentials: 'same-origin' })
        .then(function (response) { return response.text(); })
        .then(function (text) { return navigator.clipboard.writeText(text); })
        .then(function () { status(editor, 'Instrucciones copiadas. Pégalas en tu IA.', 'ok'); })
        .catch(function () { status(editor, 'No se pudieron copiar. Usa la descarga.', 'error'); });
    });

    var download = editor.querySelector('[data-cb-download]');
    download.addEventListener('click', function () {
      // Se arma al hacer clic para que lleve el título tal como está ahora.
      download.href = instructionsUrl(editor, true);
    });

    editor.querySelector('[data-cb-validate]').addEventListener('click', function () {
      status(editor, 'Revisando…');
      fetch(editor.dataset.validateUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'X-CSRFToken': csrfToken(), 'Content-Type': 'application/json' },
        body: textarea.value || '[]',
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data.ok) {
            status(editor, 'JSON correcto: ' + data.count + ' bloque(s).', 'ok');
          } else {
            status(editor, data.errors.join(' | '), 'error');
          }
        })
        .catch(function () { status(editor, 'No se pudo revisar el JSON.', 'error'); });
    });

    editor.querySelector('[data-cb-files]').addEventListener('change', function (event) {
      var files = Array.prototype.slice.call(event.target.files);
      if (!files.length) { return; }
      status(editor, '');
      uploadSequentially(editor, files).then(function () { event.target.value = ''; });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.cb-editor').forEach(wire);
  });
})();
