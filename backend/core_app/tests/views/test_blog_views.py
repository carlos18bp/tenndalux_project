import pytest
from django.urls import reverse
from rest_framework import status

from core_app.models import Post


def _results(data):
    if isinstance(data, dict) and 'results' in data:
        return data['results']
    return data


@pytest.mark.django_db
def test_post_list_filters_only_published_for_anonymous(api_client):
    Post.objects.create(title='Public', is_published=True)
    Post.objects.create(title='Hidden', is_published=False)

    url = reverse('post-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Public'}


@pytest.mark.django_db
def test_post_list_returns_all_for_authenticated(api_client, existing_user):
    Post.objects.create(title='Public', is_published=True)
    Post.objects.create(title='Hidden', is_published=False)

    api_client.force_authenticate(user=existing_user)

    url = reverse('post-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Public', 'Hidden'}
