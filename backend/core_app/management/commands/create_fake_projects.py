"""Command to generate fake Project data.

Usage:
    python manage.py create_fake_projects --num 20
"""

from decimal import Decimal

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Category, Style, Space, Project


class Command(BaseCommand):
    help = 'Create fake portfolio projects'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=20)
        parser.add_argument('--published-ratio', type=int, default=70)

    def handle(self, *args, **options):
        num = options['num']
        published_ratio = max(0, min(100, options['published_ratio']))

        categories = list(Category.objects.all())
        styles = list(Style.objects.all())
        spaces = list(Space.objects.all())

        if not categories:
            self.stdout.write(self.style.WARNING('⚠️  No categories found; projects will have no categories'))
        if not styles:
            self.stdout.write(self.style.WARNING('⚠️  No styles found; projects will have no styles'))
        if not spaces:
            self.stdout.write(self.style.WARNING('⚠️  No spaces found; projects will have no spaces'))

        created = 0
        for i in range(num):
            title = f"{self.fake.word().title()} {self.fake.word().title()}"
            is_published = self.fake.random_int(1, 100) <= published_ratio
            obj = Project.objects.create(
                title=title,
                description="\n\n".join(self.fake.paragraphs(nb=3)),
                location=f"{self.fake.city()}, {self.fake.country()}"[:200],
                year=self.fake.random_int(2016, 2026),
                area_sqm=Decimal(str(self.fake.pydecimal(left_digits=3, right_digits=2, positive=True))),
                featured=self.fake.boolean(chance_of_getting_true=20),
                is_published=is_published,
            )

            if categories:
                obj.categories.set(self.fake.random_elements(elements=categories, length=min(2, len(categories)), unique=True))
            if styles:
                obj.styles.set(self.fake.random_elements(elements=styles, length=min(2, len(styles)), unique=True))
            if spaces:
                obj.spaces.set(self.fake.random_elements(elements=spaces, length=min(3, len(spaces)), unique=True))

            created += 1
            if created % 10 == 0:
                self.stdout.write(f'  Created {created} projects...')

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} projects'))
