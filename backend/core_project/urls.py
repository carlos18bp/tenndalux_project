"""
URL configuration for core_project.

Maps URL patterns to views and includes module-specific URL configurations.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

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

    # Frontend pages (Next.js static export served by Django)
    path('', include('core_app.urls.frontend_urls')),
]

# Serve Next.js static assets (_next/), public folder assets, and media files
if settings.DEBUG:
    urlpatterns += [
        re_path(r'^_next/(?P<path>.*)$', serve, {'document_root': settings.BASE_DIR / 'static' / '_next'}),
        re_path(r'^home/(?P<path>.*)$', serve, {'document_root': settings.BASE_DIR / 'static' / 'home'}),
        re_path(r'^videos/(?P<path>.*)$', serve, {'document_root': settings.BASE_DIR / 'static' / 'videos'}),
        re_path(r'^(?P<path>favicon\.ico)$', serve, {'document_root': settings.BASE_DIR / 'static'}),
    ]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Custom 404 handler
handler404 = 'core_app.views.frontend_views.not_found'
