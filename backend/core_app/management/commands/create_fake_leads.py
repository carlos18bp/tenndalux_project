"""Command to generate fake Lead data.

Usage:
    python manage.py create_fake_leads --num 30
"""

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import Category, Space, LeadStatus, Lead


class Command(BaseCommand):
    help = 'Create fake leads'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=30)

    def handle(self, *args, **options):
        num = options['num']

        categories = list(Category.objects.all())
        spaces = list(Space.objects.all())
        statuses = list(LeadStatus.objects.all())

        if not statuses:
            self.stdout.write(self.style.WARNING('⚠️  No lead statuses found; leads will have no status'))

        budget_ranges = ['< $2,000', '$2,000 - $5,000', '$5,000 - $10,000', '$10,000+']
        how_found = ['Instagram', 'Google', 'Referido', 'TikTok', 'Facebook', 'Otro']

        created = 0
        for i in range(num):
            full_name = self.fake.name()
            email = self.fake.email()

            lead = Lead.objects.create(
                full_name=full_name,
                email=email,
                phone=self.fake.phone_number()[:50],
                city=self.fake.city()[:120],
                project_type=self.fake.random_element(categories) if categories else None,
                message=self.fake.paragraph(nb_sentences=4),
                budget_range=self.fake.random_element(budget_ranges),
                how_found_us=self.fake.random_element(how_found),
                source='form',
                utm_source='google',
                utm_medium='cpc',
                utm_campaign=self.fake.word(),
                status=self.fake.random_element(statuses) if statuses else None,
                notes='',
            )

            if spaces:
                lead.space_types.set(self.fake.random_elements(elements=spaces, length=min(2, len(spaces)), unique=True))

            created += 1
            if created % 10 == 0:
                self.stdout.write(f'  Created {created} leads...')

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} leads'))
