import pytest
from django.core.exceptions import ValidationError

from core_app.models import Post
from core_app.serializers import PostSerializer
from core_app.utils.content_blocks import validate_content_blocks


VALID_DOCUMENT = [
    {'type': 'parrafo', 'heading': '¿Qué son?', 'text': 'Sistemas motorizados.'},
    {'type': 'lista', 'items': ['Control de luz', 'Privacidad']},
    {'type': 'subsecciones', 'items': [{'title': 'Básico', 'description': 'Un motor.'}]},
    {'type': 'linea_de_tiempo',
     'steps': [{'step': 'Medición', 'description': 'Visita técnica.', 'duration': '1 día'}]},
    {'type': 'metricas', 'items': [{'metric': '-40%', 'description': 'Menos calor.'}]},
    {'type': 'galeria', 'images': ['img_a1b2c3']},
    {'type': 'video', 'youtube_url': 'https://youtu.be/dQw4w9WgXcQ'},
    {'type': 'testimonio', 'text': 'Impecable.', 'author': 'Ana', 'role': 'Cliente'},
]


def _errors(blocks):
    with pytest.raises(ValidationError) as raised:
        validate_content_blocks(blocks)
    return raised.value.messages


def test_a_document_using_every_block_type_is_accepted():
    validate_content_blocks(VALID_DOCUMENT)


def test_an_empty_document_is_accepted():
    """Un post recién creado no tiene bloques todavía."""
    validate_content_blocks([])


def test_the_document_must_be_a_list():
    assert 'lista de bloques' in _errors({'type': 'parrafo', 'text': 'x'})[0]


def test_an_unknown_type_names_the_available_ones():
    message = _errors([{'type': 'carrusel'}])[0]

    assert 'carrusel' in message
    assert 'galeria' in message and 'testimonio' in message


def test_a_missing_required_field_points_at_the_block():
    assert _errors([{'type': 'parrafo'}]) == ['Bloque 1 (parrafo): falta el campo "text".']


def test_a_misspelled_field_is_rejected_rather_than_silently_dropped():
    """El caso típico del JSON generado por IA: `texto` en vez de `text`."""
    message = _errors([{'type': 'parrafo', 'texto': 'Hola'}])

    assert any('no reconocidos: texto' in error for error in message)
    assert any('falta el campo "text"' in error for error in message)


def test_every_problem_is_reported_at_once():
    errors = _errors([{'type': 'parrafo'}, {'type': 'lista', 'items': []}, {'type': 'nope'}])

    assert len(errors) == 3
    assert errors[0].startswith('Bloque 1')
    assert errors[2].startswith('Bloque 3')


def test_a_video_that_is_not_youtube_is_rejected():
    assert 'YouTube' in _errors([{'type': 'video', 'youtube_url': 'https://vimeo.com/1'}])[0]


def test_an_empty_gallery_is_rejected():
    assert 'id de imagen' in _errors([{'type': 'galeria', 'images': []}])[0]


@pytest.mark.django_db
def test_reading_a_post_resolves_the_youtube_id_for_the_frontend():
    post = Post.objects.create(title='Guía', content_blocks=[
        {'type': 'video', 'youtube_url': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30'},
    ])

    block = PostSerializer(post).data['content_blocks'][0]

    assert block['youtube_id'] == 'dQw4w9WgXcQ'
    # Lo que se guardó no se toca: el admin sigue viendo lo que se pegó.
    assert block['youtube_url'] == 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30'


@pytest.mark.django_db
def test_the_api_refuses_to_store_blocks_the_frontend_cannot_render():
    serializer = PostSerializer(data={'title': 'Guía', 'content_blocks': [{'type': 'parrafo'}]})

    assert not serializer.is_valid()
    assert 'content_blocks' in serializer.errors


@pytest.mark.django_db
def test_the_admin_validates_through_the_model():
    post = Post(title='Guía', content_blocks=[{'type': 'video', 'youtube_url': 'no'}])

    with pytest.raises(ValidationError) as raised:
        post.full_clean()

    assert 'content_blocks' in raised.value.message_dict
