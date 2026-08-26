import pytest
from django.urls import reverse

from core_app.models import Post, Project


@pytest.fixture()
def shells(settings, tmp_path):
    """El shell que produce el build; los tests no dependen de haberlo compilado."""
    frontend = tmp_path / 'templates' / 'frontend'
    for section in ('blog', 'portafolio'):
        shell = frontend / section / '_shell'
        shell.mkdir(parents=True)
        (shell / 'index.html').write_text(
            '<html><head><title>Tenndalux</title>'
            '<meta name="description" content="generico"></head><body>app</body></html>',
            encoding='utf-8',
        )
    settings.BASE_DIR = tmp_path
    import core_app.views.frontend_views as views
    views.TEMPLATES_DIR = frontend
    return frontend


@pytest.mark.django_db
def test_a_published_post_is_served_with_its_own_metadata(client, shells):
    Post.objects.create(
        title='Cortinas inteligentes',
        slug='cortinas-inteligentes',
        meta_description='Guía completa de cortinas inteligentes.',
        is_published=True,
    )

    response = client.get('/blog/cortinas-inteligentes/')
    html = response.content.decode()

    assert response.status_code == 200
    # Sin esto todos los artículos compartirían el título del shell y ni Google
    # ni el previsualizador de WhatsApp verían de qué trata cada uno.
    assert '<title>Cortinas inteligentes — Tenndalux</title>' in html
    assert 'Guía completa de cortinas inteligentes.' in html
    assert 'og:title' in html
    assert 'generico' not in html


@pytest.mark.django_db
def test_every_post_is_served_by_the_same_template(client, shells):
    """Publicar desde el admin no puede exigir un despliegue."""
    for slug in ('uno', 'dos'):
        Post.objects.create(title=slug, slug=slug, is_published=True)

    assert client.get('/blog/uno/').status_code == 200
    assert client.get('/blog/dos/').status_code == 200


@pytest.mark.django_db
def test_an_unpublished_post_is_not_reachable(client, shells):
    Post.objects.create(title='Borrador', slug='borrador', is_published=False)

    response = client.get('/blog/borrador/')

    assert response.status_code == 404
    assert 'Artículo no encontrado' in response.content.decode()


@pytest.mark.django_db
def test_a_missing_post_still_gets_the_site_page(client, shells):
    """404 para el buscador, pero con la página del sitio y no la de Django."""
    response = client.get('/blog/no-existe/')

    assert response.status_code == 404
    assert 'body' in response.content.decode()


@pytest.mark.django_db
def test_a_published_project_is_served_with_its_own_metadata(client, shells):
    Project.objects.create(
        title='Residencia Premium Envigado',
        slug='residencia-premium-envigado',
        description='Automatización completa en un apartamento de 240 m².',
        is_published=True,
    )

    html = client.get('/portafolio/residencia-premium-envigado/').content.decode()

    assert '<title>Residencia Premium Envigado — Tenndalux</title>' in html
    assert 'Automatización completa' in html


@pytest.mark.django_db
def test_metadata_is_escaped(client, shells):
    """El título lo escribe el cliente en el admin: no puede inyectar HTML."""
    Post.objects.create(
        title='Cortinas <script>alert(1)</script>', slug='xss', is_published=True
    )

    html = client.get('/blog/xss/').content.decode()

    assert '<script>alert(1)</script>' not in html
    assert '&lt;script&gt;' in html
