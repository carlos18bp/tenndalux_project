import pytest

from core_app.models import AboutPage, Category, HomePage, SiteSettings


@pytest.mark.django_db
def test_slug_is_generated_and_unique_for_category():
    c1 = Category.objects.create(name='Kitchen')
    c2 = Category.objects.create(name='Kitchen')

    assert c1.slug == 'kitchen'
    assert c2.slug == 'kitchen-2'


@pytest.mark.django_db
def test_singleton_load_creates_one_row_and_pk_is_1():
    settings_1 = SiteSettings.load()
    settings_2 = SiteSettings.load()

    assert settings_1.pk == 1
    assert settings_2.pk == 1
    assert SiteSettings.objects.count() == 1

    home_1 = HomePage.load()
    home_2 = HomePage.load()
    assert home_1.pk == 1
    assert home_2.pk == 1
    assert HomePage.objects.count() == 1

    about_1 = AboutPage.load()
    about_2 = AboutPage.load()
    assert about_1.pk == 1
    assert about_2.pk == 1
    assert AboutPage.objects.count() == 1
