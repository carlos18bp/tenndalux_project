import secrets

from django.db import models

from .base import TimestampedModel


def _generate_public_id():
    # Corto y pegable a mano en el JSON de los bloques: el editor copia este id
    # del cargador de fotos y lo escribe dentro de un bloque "galeria".
    return f'img_{secrets.token_hex(5)}'


class ContentImage(TimestampedModel):
    """
    Una foto subida para usarse dentro de un bloque `galeria`.

    Vive aparte del post o el proyecto a propósito: el JSON de bloques se
    escribe (o se genera con una IA) antes de tener las fotos, y las fotos se
    cargan sin tocar el JSON. El vínculo es el `public_id`.
    """

    public_id = models.CharField(max_length=24, unique=True, editable=False, db_index=True)
    image = models.ImageField(upload_to='content/%Y/%m/')
    alt = models.CharField(max_length=200, blank=True, help_text='Texto alternativo para accesibilidad y SEO.')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.public_id

    def save(self, *args, **kwargs):
        if not self.public_id:
            # Colisionar 5 bytes es improbable, pero barato de descartar.
            while True:
                candidate = _generate_public_id()
                if not ContentImage.objects.filter(public_id=candidate).exists():
                    self.public_id = candidate
                    break
        return super().save(*args, **kwargs)
