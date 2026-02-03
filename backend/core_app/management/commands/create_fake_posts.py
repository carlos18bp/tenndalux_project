"""Command to generate fake Blog Post data.

Usage:
    python manage.py create_fake_posts --num 15
"""

from django.core.management.base import BaseCommand
from faker import Faker

from core_app.models import User, Tag, Post


class Command(BaseCommand):
    help = 'Create fake blog posts'

    def __init__(self):
        super().__init__()
        self.fake = Faker()

    def add_arguments(self, parser):
        parser.add_argument('--num', type=int, default=15)
        parser.add_argument('--published-ratio', type=int, default=70)

    def handle(self, *args, **options):
        num = options['num']
        published_ratio = max(0, min(100, options['published_ratio']))

        users = list(User.objects.all())
        tags = list(Tag.objects.all())

        if not tags:
            self.stdout.write(self.style.WARNING('⚠️  No tags found; posts will have no tags'))

        created = 0
        for i in range(num):
            title = self.fake.sentence(nb_words=6).rstrip('.')
            is_published = self.fake.random_int(1, 100) <= published_ratio

            post = Post.objects.create(
                title=title,
                excerpt=self.fake.paragraph(nb_sentences=3),
                content="\n\n".join(self.fake.paragraphs(nb=5)),
                author=self.fake.random_element(users) if users else None,
                is_published=is_published,
                meta_title=title[:255],
                meta_description=self.fake.text(max_nb_chars=160),
            )

            if tags:
                post.tags.set(self.fake.random_elements(elements=tags, length=min(4, len(tags)), unique=True))

            created += 1
            if created % 10 == 0:
                self.stdout.write(f'  Created {created} posts...')

        self.stdout.write(self.style.SUCCESS(f'✅ Created {created} posts'))
