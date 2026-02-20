"""
Frontend views that serve Next.js static export HTML templates.

These views read the pre-built HTML files from templates/frontend/
and return them as HttpResponse to avoid Django template engine
processing (which could conflict with Next.js inline JS containing
curly braces).
"""

from pathlib import Path
from django.http import HttpResponse, Http404
from django.conf import settings

TEMPLATES_DIR = settings.BASE_DIR / 'templates' / 'frontend'


def _serve_html(template_path: str):
    """Read an HTML file and return it as HttpResponse."""
    file_path = TEMPLATES_DIR / template_path
    if file_path.exists():
        return HttpResponse(
            file_path.read_text(encoding='utf-8'),
            content_type='text/html; charset=utf-8',
        )
    raise Http404


def home(request):
    return _serve_html('index.html')


def productos(request):
    return _serve_html('productos/index.html')


def servicios(request):
    return _serve_html('servicios/index.html')


def portafolio(request):
    return _serve_html('portafolio/index.html')


def portafolio_detail(request, slug):
    return _serve_html(f'portafolio/{slug}/index.html')


def blog(request):
    return _serve_html('blog/index.html')


def blog_detail(request, slug):
    return _serve_html(f'blog/{slug}/index.html')


def auth_login(request):
    return _serve_html('auth/login/index.html')


def auth_register(request):
    return _serve_html('auth/register/index.html')


def dashboard(request):
    return _serve_html('dashboard/index.html')


def not_found(request, exception=None):
    """Custom 404 handler."""
    file_path = TEMPLATES_DIR / '404.html'
    if file_path.exists():
        return HttpResponse(
            file_path.read_text(encoding='utf-8'),
            content_type='text/html; charset=utf-8',
            status=404,
        )
    return HttpResponse('<h1>404 - Page Not Found</h1>', status=404)
