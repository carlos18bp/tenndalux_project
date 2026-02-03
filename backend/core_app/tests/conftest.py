import pytest
from rest_framework.test import APIClient

from core_app.models import User


@pytest.fixture()
def api_client():
    return APIClient()


@pytest.fixture()
def existing_user(db):
    return User.objects.create_user(email='existing_user@example.com', password='existingpassword')
