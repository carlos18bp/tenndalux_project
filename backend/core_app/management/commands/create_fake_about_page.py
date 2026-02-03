"""Command to populate AboutPage singleton.

Usage:
    python manage.py create_fake_about_page
"""

from django.core.management.base import BaseCommand

from core_app.models import AboutPage


class Command(BaseCommand):
    help = 'Populate about page singleton'

    def handle(self, *args, **options):
        obj = AboutPage.load()
        obj.title = 'Sobre Tenndalux'
        obj.content = 'Somos un estudio de diseño interior enfocado en crear espacios funcionales y sofisticados.'
        obj.team_section = [
            {
                'name': 'Andrea',
                'role': 'Directora Creativa',
                'bio': 'Diseñadora interior con enfoque en materiales y experiencia de usuario.',
            },
            {
                'name': 'Carlos',
                'role': 'Project Manager',
                'bio': 'Gestión integral de obra y coordinación con proveedores.',
            },
        ]
        obj.meta_title = 'Sobre Tenndalux'
        obj.meta_description = 'Conoce nuestro enfoque, proceso y equipo.'
        obj.save()

        self.stdout.write(self.style.SUCCESS('✅ Populated about page'))
