"""Command to generate fake LeadStatus data.

Usage:
    python manage.py create_fake_lead_statuses
"""

from django.core.management.base import BaseCommand

from core_app.models import LeadStatus


class Command(BaseCommand):
    help = 'Create default lead statuses'

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=6)

    def handle(self, *args, **options):
        defaults = [
            ('Nuevo', '#3b82f6'),
            ('Contactado', '#a855f7'),
            ('En proceso', '#f59e0b'),
            ('Ganado', '#22c55e'),
            ('Perdido', '#ef4444'),
            ('Cerrado', '#64748b'),
        ]
        num = options['num']

        created = 0
        for i, (name, color) in enumerate(defaults[:num]):
            obj, was_created = LeadStatus.objects.get_or_create(
                name=name,
                defaults={'color': color, 'order': i},
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} lead statuses'))
