import pytest
from django.urls import reverse
from rest_framework import status

from core_app.models import ProcessStep, Service


def _results(data):
    if isinstance(data, dict) and 'results' in data:
        return data['results']
    return data


@pytest.mark.django_db
def test_service_list_filters_only_active_for_anonymous(api_client):
    Service.objects.create(title='Active', is_active=True)
    Service.objects.create(title='Inactive', is_active=False)

    url = reverse('service-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Active'}


@pytest.mark.django_db
def test_service_list_returns_all_for_authenticated(api_client, existing_user):
    Service.objects.create(title='Active', is_active=True)
    Service.objects.create(title='Inactive', is_active=False)

    api_client.force_authenticate(user=existing_user)

    url = reverse('service-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Active', 'Inactive'}


@pytest.mark.django_db
def test_process_steps_list_filters_only_active_for_anonymous(api_client):
    ProcessStep.objects.create(title='Active', is_active=True)
    ProcessStep.objects.create(title='Inactive', is_active=False)

    url = reverse('process-step-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    titles = {item['title'] for item in _results(response.data)}
    assert titles == {'Active'}
