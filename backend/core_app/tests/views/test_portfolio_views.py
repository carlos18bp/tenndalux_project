import pytest
from django.urls import reverse
from rest_framework import status

from core_app.models import Category, Project


def _results(data):
    if isinstance(data, dict) and 'results' in data:
        return data['results']
    return data


@pytest.mark.django_db
def test_category_list_allows_anonymous(api_client):
    Category.objects.create(name='Residential')

    url = reverse('category-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert len(_results(response.data)) == 1


@pytest.mark.django_db
def test_category_create_requires_auth(api_client):
    url = reverse('category-list')
    response = api_client.post(url, {'name': 'New'}, format='json')

    assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)


@pytest.mark.django_db
def test_category_create_allows_authenticated(api_client, existing_user):
    api_client.force_authenticate(user=existing_user)

    url = reverse('category-list')
    response = api_client.post(url, {'name': 'New'}, format='json')

    assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
def test_project_list_filters_only_published_for_anonymous(api_client):
    Project.objects.create(title='Public', is_published=True)
    Project.objects.create(title='Hidden', is_published=False)

    url = reverse('project-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Public'}


@pytest.mark.django_db
def test_project_list_returns_all_for_authenticated(api_client, existing_user):
    Project.objects.create(title='Public', is_published=True)
    Project.objects.create(title='Hidden', is_published=False)

    api_client.force_authenticate(user=existing_user)

    url = reverse('project-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Public', 'Hidden'}
