"""Command to populate HomePage singleton.

Usage:
    python manage.py create_fake_home_page
"""

from django.core.management.base import BaseCommand

from core_app.models import HomePage, Project


class Command(BaseCommand):
    help = 'Populate home page singleton'

    def handle(self, *args, **options):
        obj = HomePage.load()
        obj.hero_title = 'Diseño a medida. Espacios que se sienten.'
        obj.hero_subtitle = 'Creamos interiores modernos, funcionales y con carácter.'
        obj.hero_cta_text = 'Agenda una consulta'
        obj.value_proposition_title = 'Por qué Tenndalux'
        obj.value_proposition_items = [
            'Diseño centrado en tu estilo de vida',
            'Materiales premium y aliados confiables',
            'Proceso claro con entregables definidos',
        ]
        obj.meta_title = 'Tenndalux | Diseño interior y remodelación'
        obj.meta_description = 'Estudio de diseño interior: proyectos residenciales y comerciales. Renders, remodelación y supervisión.'
        obj.save()

        projects = list(Project.objects.filter(is_published=True)[:6])
        if projects:
            obj.featured_projects.set(projects)

        self.stdout.write(self.style.SUCCESS('✅ Populated home page'))
