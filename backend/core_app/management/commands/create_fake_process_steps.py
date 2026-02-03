"""Command to generate fake ProcessStep data.

Usage:
    python manage.py create_fake_process_steps
"""

from django.core.management.base import BaseCommand

from core_app.models import ProcessStep


class Command(BaseCommand):
    help = 'Create default process steps'

    def handle(self, *args, **options):
        defaults = [
            {
                'title': 'Consulta inicial',
                'description': 'Entendemos tu necesidad, estilo y alcance del proyecto.',
                'duration': '1-2 días',
                'deliverables': ['Brief del proyecto', 'Recomendaciones iniciales'],
                'order': 0,
            },
            {
                'title': 'Conceptualización',
                'description': 'Definimos la propuesta de diseño y moodboard.',
                'duration': '3-7 días',
                'deliverables': ['Moodboard', 'Concepto de diseño'],
                'order': 1,
            },
            {
                'title': 'Diseño',
                'description': 'Planos, renders y especificaciones.',
                'duration': '1-3 semanas',
                'deliverables': ['Planos', 'Renders', 'Especificaciones'],
                'order': 2,
            },
            {
                'title': 'Ejecución',
                'description': 'Acompañamiento y supervisión en obra.',
                'duration': 'Según alcance',
                'deliverables': ['Cronograma', 'Seguimiento', 'Entrega final'],
                'order': 3,
            },
        ]

        created = 0
        for item in defaults:
            obj, was_created = ProcessStep.objects.get_or_create(
                title=item['title'],
                defaults=item,
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} process steps'))
