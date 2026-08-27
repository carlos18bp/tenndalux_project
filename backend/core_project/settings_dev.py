"""Development-specific settings for tenndalux_project.

Imported automatically by ``settings.py`` when ``DJANGO_ENV != 'production'``.
"""

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '*']

MAILERS = {
    'default': {
        'BACKEND': 'django.core.mail.backends.console.EmailBackend',
    },
}
