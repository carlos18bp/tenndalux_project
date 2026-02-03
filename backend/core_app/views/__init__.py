"""
Views package for core_app.
"""
from .auth_views import (
    register_user,
    login_user,
    get_user_profile,
    update_user_profile,
)

from .portfolio_views import CategoryViewSet, StyleViewSet, SpaceViewSet, ProjectViewSet
from .blog_views import TagViewSet, PostViewSet
from .services_views import ServiceViewSet, ProcessStepViewSet
from .leads_views import LeadStatusViewSet, LeadViewSet
from .site_views import SiteSettingsView, HomePageView, AboutPageView

__all__ = [
    'register_user',
    'login_user',
    'get_user_profile',
    'update_user_profile',
    'CategoryViewSet',
    'StyleViewSet',
    'SpaceViewSet',
    'ProjectViewSet',
    'TagViewSet',
    'PostViewSet',
    'ServiceViewSet',
    'ProcessStepViewSet',
    'LeadStatusViewSet',
    'LeadViewSet',
    'SiteSettingsView',
    'HomePageView',
    'AboutPageView',
]
