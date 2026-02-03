import pytest
from django.urls import reverse
from rest_framework import status

from core_app.models import SiteSettings


@pytest.mark.django_db
def test_site_settings_get_allows_anonymous(api_client):
    url = reverse('site-settings')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert response.data['id'] == SiteSettings.load().id


@pytest.mark.django_db
def test_site_settings_patch_requires_auth(api_client):
    url = reverse('site-settings')
    response = api_client.patch(url, {'company_name': 'Tenndalux'}, format='json')

    assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


@pytest.mark.django_db
def test_site_settings_patch_allows_authenticated(api_client, existing_user):
    api_client.force_authenticate(user=existing_user)

    url = reverse('site-settings')
    response = api_client.patch(url, {'company_name': 'Tenndalux'}, format='json')

    assert response.status_code == status.HTTP_200_OK
    assert response.data['company_name'] == 'Tenndalux'
