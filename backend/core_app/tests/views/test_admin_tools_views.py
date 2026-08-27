import io
import json
import zipfile

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from PIL import Image

from core_app.models import ContentImage, Post, User
from core_app.utils.content_blocks import BLOCK_TYPES


@pytest.fixture()
def staff(db):
    return User.objects.create_user(
        email='editor@tenndalux.com', password='x', is_staff=True, is_superuser=True
    )


def _png(size=(20, 20)):
    buffer = io.BytesIO()
    Image.new('RGB', size, 'white').save(buffer, format='PNG')
    return SimpleUploadedFile('foto.png', buffer.getvalue(), content_type='image/png')


@pytest.mark.django_db
def test_instructions_are_only_for_staff(client):
    response = client.get(reverse('content-blocks-instructions'))

    assert response.status_code == 302
    assert '/admin/login' in response['Location']


@pytest.mark.django_db
def test_instructions_describe_every_block_and_name_the_subject(client, staff):
    client.force_login(staff)

    response = client.get(
        reverse('content-blocks-instructions'),
        {'kind': 'portafolio', 'subject': 'Residencia Premium Envigado'},
    )
    text = response.content.decode()

    assert response.status_code == 200
    assert 'Residencia Premium Envigado' in text
    # Generado desde BLOCK_TYPES: si se agrega un bloque, aparece aquí solo.
    for tipo in ('parrafo', 'lista', 'galeria', 'video', 'testimonio', 'linea_de_tiempo'):
        assert f'`{tipo}`' in text
    assert 'ÚNICAMENTE un array JSON' in text


@pytest.mark.django_db
def test_the_download_bundles_the_guide_and_the_json_format(client, staff):
    client.force_login(staff)

    response = client.get(reverse('content-blocks-instructions'), {'kind': 'blog', 'download': '1'})

    assert 'attachment; filename="instrucciones-blog.zip"' in response['Content-Disposition']

    with zipfile.ZipFile(io.BytesIO(response.content)) as archive:
        assert sorted(archive.namelist()) == ['formato-bloques.json', 'instrucciones-blog.md']
        formato = json.loads(archive.read('formato-bloques.json'))

    # El esquema sale del mismo catálogo que valida: describe los ocho bloques.
    assert set(formato) == set(BLOCK_TYPES)
    assert formato['parrafo']['campos']['text']['obligatorio'] is True


@pytest.mark.django_db
def test_the_copied_guide_carries_the_json_format_and_a_full_example(client, staff):
    """Lo que se pega en la IA tiene que bastar por sí solo."""
    client.force_login(staff)

    text = client.get(reverse('content-blocks-instructions')).content.decode()

    assert 'Formato exacto de cada bloque (JSON)' in text
    assert '"obligatorio": true' in text
    # El ejemplo usa los ocho tipos: uno que no aparezca, la IA no lo usa.
    for tipo in BLOCK_TYPES:
        assert f'"type": "{tipo}"' in text


@pytest.mark.django_db
def test_uploading_an_image_returns_the_id_to_paste_in_the_gallery_block(client, staff):
    client.force_login(staff)

    response = client.post(reverse('content-blocks-upload-image'), {'image': _png(), 'alt': 'Sala'})
    body = response.json()

    assert response.status_code == 200
    assert body['public_id'].startswith('img_')
    assert ContentImage.objects.get(public_id=body['public_id']).alt == 'Sala'


@pytest.mark.django_db
def test_an_oversized_upload_is_refused_with_its_weight(client, staff):
    client.force_login(staff)
    heavy = SimpleUploadedFile('grande.png', b'x' * (3 * 1024 * 1024), content_type='image/png')

    response = client.post(reverse('content-blocks-upload-image'), {'image': heavy})

    assert response.status_code == 400
    assert 'máximo es 2 MB' in response.json()['error']
    assert ContentImage.objects.count() == 0


@pytest.mark.django_db
def test_a_file_that_is_not_an_image_is_refused(client, staff):
    client.force_login(staff)
    fake = SimpleUploadedFile('nota.txt', b'hola', content_type='text/plain')

    response = client.post(reverse('content-blocks-upload-image'), {'image': fake})

    assert response.status_code == 400
    assert ContentImage.objects.count() == 0


@pytest.mark.django_db
def test_the_json_can_be_checked_before_saving(client, staff):
    client.force_login(staff)

    ok = client.post(
        reverse('content-blocks-validate'),
        data='[{"type": "parrafo", "text": "Hola"}]',
        content_type='application/json',
    )
    bad = client.post(
        reverse('content-blocks-validate'),
        data='[{"type": "parrafo"}]',
        content_type='application/json',
    )

    assert ok.json() == {'ok': True, 'count': 1}
    assert bad.json()['ok'] is False
    assert 'falta el campo "text"' in bad.json()['errors'][0]


@pytest.mark.django_db
def test_malformed_json_is_reported_rather_than_crashing(client, staff):
    client.force_login(staff)

    response = client.post(
        reverse('content-blocks-validate'), data='[{"type":', content_type='application/json'
    )

    assert response.json()['ok'] is False
    assert 'El JSON no es válido' in response.json()['errors'][0]


@pytest.mark.django_db
def test_the_post_admin_renders_the_block_editor(client, staff):
    """Comprueba que el widget se monta: sin esto el JS nunca se engancha."""
    client.force_login(staff)
    post = Post.objects.create(title='Guía')

    response = client.get(reverse('admin:core_app_post_change', args=[post.pk]))
    html = response.content.decode()

    assert 'cb-editor' in html
    assert 'data-kind="blog"' in html
    assert 'core_app/content_blocks.js' in html


@pytest.mark.django_db
def test_each_kind_gets_its_own_outline(client, staff):
    """El blog y el portafolio comparten catálogo pero no se redactan igual."""
    client.force_login(staff)

    def guide(kind):
        return client.get(
            reverse('content-blocks-instructions'), {'kind': kind}
        ).content.decode()

    blog = guide('blog')
    portafolio = guide('portafolio')

    assert 'artículo del blog' in blog
    assert 'Cierra SIEMPRE con un bloque `cierre`' in blog

    assert 'ficha de un proyecto' in portafolio
    assert 'Empieza por el reto' in portafolio
    assert 'resultados medibles van en `metricas`' in portafolio


@pytest.mark.django_db
def test_the_project_admin_renders_the_block_editor_for_the_portfolio(client, staff):
    from core_app.models import Project

    client.force_login(staff)
    project = Project.objects.create(title='Residencia Premium Envigado')

    html = client.get(reverse('admin:core_app_project_change', args=[project.pk])).content.decode()

    assert 'data-kind="portafolio"' in html
    assert 'cb-editor' in html
