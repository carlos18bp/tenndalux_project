import pytest
from django.urls import reverse
from rest_framework import status

from core_app.models import Lead, LeadStatus


def _results(data):
    if isinstance(data, dict) and 'results' in data:
        return data['results']
    return data


@pytest.mark.django_db
def test_lead_statuses_list_allows_anonymous(api_client):
    LeadStatus.objects.create(name='New', order=0)

    url = reverse('lead-status-list')
    response = api_client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert len(_results(response.data)) == 1


@pytest.mark.django_db
def test_lead_create_allows_anonymous(api_client):
    url = reverse('lead-list')
    response = api_client.post(
        url,
        {
            'full_name': 'Jane Doe',
            'email': 'jane@example.com',
            'message': 'Hello',
        },
        format='json',
    )

    assert response.status_code == status.HTTP_201_CREATED
    assert Lead.objects.count() == 1


@pytest.mark.django_db
def test_lead_list_requires_auth(api_client):
    Lead.objects.create(full_name='Jane Doe', email='jane@example.com')

    url = reverse('lead-list')
    response = api_client.get(url)

    assert response.status_code in (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN)
