"""
URL patterns for authentication endpoints.

Maps authentication views to their respective URL paths.
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from ..views.auth_views import (
    register_user,
    login_user,
    get_user_profile,
    update_user_profile,
)

urlpatterns = [
    # Registration & Login
    path('register/', register_user, name='register-user'),
    path('login/', login_user, name='login-user'),
    
    # JWT Token refresh
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Profile management
    path('profile/', get_user_profile, name='get-user-profile'),
    path('profile/update/', update_user_profile, name='update-user-profile'),
]
