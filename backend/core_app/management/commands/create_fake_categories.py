"""Command to generate fake Category data.

Usage:
    python manage.py create_fake_categories --num 10
"""

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Category


class Command(BaseCommand):
    help = 'Create fake project categories'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=6)

    def handle(self, *args, **options):
        num = options['num']
        defaults = [
            'Residencial',
            'Comercial',
            'Corporativo',
            'Hospitalidad',
            'Remodelación',
            'Cocinas',
        ]

        created = 0
        names = defaults[:]
        while len(names) < num:
            names.append(self.fake.word().title())

        for i, name in enumerate(names[:num]):
            obj, was_created = Category.objects.get_or_create(
                name=name,
                defaults={'order': i},
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} categories'))
