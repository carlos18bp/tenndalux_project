"""Command to generate fake Service data.

Usage:
    python manage.py create_fake_services --num 8
"""

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Service


class Command(BaseCommand):
    help = 'Create fake services'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=8)

    def handle(self, *args, **options):
        num = options['num']
        defaults = [
            'Diseño Interior',
            'Remodelación Integral',
            'Diseño de Cocinas',
            'Diseño Comercial',
            'Diseño Corporativo',
            'Asesoría de Decoración',
            'Renders 3D',
            'Supervisión de Obra',
        ]

        created = 0
        titles = defaults[:]
        while len(titles) < num:
            titles.append(f"{self.fake.word().title()} {self.fake.word().title()}")

        for i, title in enumerate(titles[:num]):
            obj, was_created = Service.objects.get_or_create(
                title=title,
                defaults={
                    'short_description': self.fake.sentence(nb_words=12),
                    'full_description': "\n\n".join(self.fake.paragraphs(nb=3)),
                    'includes': [self.fake.sentence(nb_words=6) for _ in range(3)],
                    'excludes': [self.fake.sentence(nb_words=6) for _ in range(2)],
                    'order': i,
                    'is_active': True,
                },
            )
            if was_created:
                created += 1

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} services'))
