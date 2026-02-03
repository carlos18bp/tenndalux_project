"""
URL configuration for core_project.

Maps URL patterns to views and includes module-specific URL configurations.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Django Admin
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/auth/', include('core_app.urls.auth_urls')),
    path('api/portfolio/', include('core_app.urls.portfolio_urls')),
    path('api/blog/', include('core_app.urls.blog_urls')),
    path('api/services/', include('core_app.urls.services_urls')),
    path('api/leads/', include('core_app.urls.leads_urls')),
    path('api/site/', include('core_app.urls.site_urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
