"""
Command to generate fake user data for development and testing.

This command creates realistic user records with:
- Random names, emails, and phone numbers
- Test passwords for easy login
- Mixed active/inactive states

Usage:
    python manage.py create_fake_users --num 20
    python manage.py create_fake_users --num 50 --password testpass123
"""
from django.core.management.base import BaseCommand
from faker import Faker
from core_app.models import User


class Command(BaseCommand):
    help = 'Create fake users with realistic data'
    
    def __init__(self):
        super().__init__()
        self.fake = Faker()
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--num',
            type=int,
            default=20,
            help='Number of users to create (default: 20)'
        )
        parser.add_argument(
            '--password',
            type=str,
            default='password123',
            help='Password for all fake users (default: password123)'
        )
    
    def handle(self, *args, **options):
        num_users = options['num']
        password = options['password']
        
        self.stdout.write(f'Creating {num_users} fake users...')
        
        created_count = 0
        for i in range(num_users):
            user = self._create_user(password)
            if user:
                created_count += 1
                if created_count % 10 == 0:
                    self.stdout.write(f'  Created {created_count} users...')
        
        self.stdout.write(self.style.SUCCESS(
            f'\n✅ Successfully created {created_count} users'
        ))
        self.stdout.write(f'   Password for all users: {password}')
    
    def _create_user(self, password):
        """
        Create a single user with randomized data.
        
        Args:
            password: Password to set for the user.
        
        Returns:
            User: The created user instance.
        """
        first_name = self.fake.first_name()
        last_name = self.fake.last_name()
        email = f"{first_name.lower()}.{last_name.lower()}{self.fake.random_int(1, 999)}@example.com"
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return None
        
        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            role=self.fake.random_element([User.ROLE_VIEWER, User.ROLE_VIEWER, User.ROLE_VIEWER, User.ROLE_EDITOR, User.ROLE_ADMIN]),
            phone=self.fake.phone_number()[:20],
            is_active=self.fake.boolean(chance_of_getting_true=90),  # 90% active
        )
        
        return user
