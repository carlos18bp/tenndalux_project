"""Command to generate fake Space data.

Usage:
    python manage.py create_fake_spaces --num 12
"""

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Space


class Command(BaseCommand):
    help = 'Create fake space types'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=10)

    def handle(self, *args, **options):
        num = options['num']
        defaults = [
            'Cocina',
            'Sala',
            'Comedor',
            'Baño',
            'Habitación',
            'Oficina',
            'Terraza',
            'Recepción',
            'Local',
            'Showroom',
        ]

        created = 0
        names = defaults[:]
        while len(names) < num:
            names.append(self.fake.word().title())

        for i, name in enumerate(names[:num]):
            obj, was_created = Space.objects.get_or_create(
                name=name,
                defaults={'order': i},
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} spaces'))
