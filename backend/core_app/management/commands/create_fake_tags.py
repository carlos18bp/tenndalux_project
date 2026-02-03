"""Command to generate fake Tag data.

Usage:
    python manage.py create_fake_tags --num 15
"""

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Tag


class Command(BaseCommand):
    help = 'Create fake blog tags'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=12)

    def handle(self, *args, **options):
        num = options['num']
        defaults = [
            'Tendencias',
            'Remodelación',
            'Guías',
            'Materiales',
            'Iluminación',
            'Espacios Pequeños',
            'Lujo',
            'Color',
            'Mobiliario',
            'Decoración',
            'Tips',
            'Antes y Después',
        ]

        created = 0
        names = defaults[:]
        while len(names) < num:
            names.append(self.fake.word().title())

        for i, name in enumerate(names[:num]):
            obj, was_created = Tag.objects.get_or_create(
                name=name,
                defaults={'order': i},
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} tags'))
