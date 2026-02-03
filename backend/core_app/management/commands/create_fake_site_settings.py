"""Command to populate SiteSettings singleton.

Usage:
    python manage.py create_fake_site_settings
"""

from django.core.management.base import BaseCommand

from core_app.models import SiteSettings


class Command(BaseCommand):
    help = 'Populate site settings singleton'

    def handle(self, *args, **options):
        obj = SiteSettings.load()
        obj.company_name = 'Tenndalux'
        obj.tagline = 'Interior design & remodelación premium'
        obj.phone = '+1 555 0100'
        obj.whatsapp_number = '+1 555 0100'
        obj.email = 'contacto@tenndalux.com'
        obj.address = '123 Design Street'
        obj.city = 'Ciudad'
        obj.social_instagram = 'https://instagram.com/tenndalux'
        obj.social_facebook = 'https://facebook.com/tenndalux'
        obj.social_youtube = 'https://youtube.com/@tenndalux'
        obj.social_tiktok = 'https://tiktok.com/@tenndalux'
        obj.footer_text = '© Tenndalux. Todos los derechos reservados.'
        obj.save()

        self.stdout.write(self.style.SUCCESS('✅ Populated site settings'))
