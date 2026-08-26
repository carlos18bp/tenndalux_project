import pytest
from django.core import mail
from django.test import override_settings
from django.urls import reverse
from rest_framework import status

from core_app.models import Lead


LOCMEM = 'django.core.mail.backends.locmem.EmailBackend'

PAYLOAD = {
    'full_name': 'Jane Doe',
    'email': 'jane@example.com',
    'phone': '+57 300 000 0000',
    'message': 'Me interesa: Luminux',
    'source': 'formulario-home',
}


@pytest.mark.django_db
@override_settings(LEADS_NOTIFICATION_EMAILS=['ventas@tenndalux.com'], EMAIL_BACKEND=LOCMEM)
def test_lead_create_notifies_the_configured_addresses(api_client):
    response = api_client.post(reverse('lead-list'), PAYLOAD, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert len(mail.outbox) == 1

    message = mail.outbox[0]
    assert message.to == ['ventas@tenndalux.com']
    assert 'Jane Doe' in message.subject
    assert 'Me interesa: Luminux' in message.body
    # Contestar la notificación le escribe a quien llenó el formulario.
    assert message.reply_to == ['jane@example.com']


@pytest.mark.django_db
@override_settings(
    LEADS_NOTIFICATION_EMAILS=['ventas@tenndalux.com', 'gerencia@tenndalux.com'],
    EMAIL_BACKEND=LOCMEM,
)
def test_lead_notification_reaches_every_configured_address(api_client):
    api_client.post(reverse('lead-list'), PAYLOAD, format='json')

    assert mail.outbox[0].to == ['ventas@tenndalux.com', 'gerencia@tenndalux.com']


@pytest.mark.django_db
@override_settings(LEADS_NOTIFICATION_EMAILS=[], EMAIL_BACKEND=LOCMEM)
def test_lead_is_stored_even_with_no_recipient_configured(api_client):
    """Estado por defecto hasta que el cliente entregue su correo."""
    response = api_client.post(reverse('lead-list'), PAYLOAD, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert Lead.objects.count() == 1
    assert mail.outbox == []


@pytest.mark.django_db
@override_settings(
    LEADS_NOTIFICATION_EMAILS=['ventas@tenndalux.com'],
    EMAIL_BACKEND='core_app.tests.views.test_leads_notification.BrokenEmailBackend',
)
def test_lead_survives_a_broken_mail_server(api_client):
    """El lead ya está capturado: un SMTP caído no puede convertirlo en un 500."""
    response = api_client.post(reverse('lead-list'), PAYLOAD, format='json')

    assert response.status_code == status.HTTP_201_CREATED
    assert Lead.objects.count() == 1


class BrokenEmailBackend:
    def __init__(self, *args, **kwargs):
        pass

    def send_messages(self, email_messages):
        raise OSError('smtp unreachable')
