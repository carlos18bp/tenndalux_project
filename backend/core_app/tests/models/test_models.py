import pytest

from core_app.models import AboutPage, Category, HomePage, SiteSettings


@pytest.mark.django_db
def test_slug_is_generated_and_unique_for_category():
    c1 = Category.objects.create(name='Kitchen')
    c2 = Category.objects.create(name='Kitchen')

    assert c1.slug == 'kitchen'
    assert c2.slug == 'kitchen-2'


@pytest.mark.django_db
def test_site_settings_singleton_load():
    s1 = SiteSettings.load()
    s2 = SiteSettings.load()
    assert s1.pk == 1
    assert s2.pk == 1
    assert SiteSettings.objects.count() == 1


@pytest.mark.django_db
def test_home_page_singleton_load():
    h1 = HomePage.load()
    h2 = HomePage.load()
    assert h1.pk == 1
    assert h2.pk == 1
    assert HomePage.objects.count() == 1


@pytest.mark.django_db
def test_about_page_singleton_load():
    a1 = AboutPage.load()
    a2 = AboutPage.load()
    assert a1.pk == 1
    assert a2.pk == 1
    assert AboutPage.objects.count() == 1
