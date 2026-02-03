"""
Master command to orchestrate fake data creation for the entire system.

This command calls individual entity commands in the correct order,
respecting model dependencies (e.g., Products need Categories first).

Architecture Pattern:
    Each model has its own create_fake_* command file.
    This master command orchestrates them all in dependency order.

Usage:
    python manage.py create_fake_data
    python manage.py create_fake_data --users 50 --password testpass
    python manage.py create_fake_data --skip-users  # Skip user creation

Dependencies Order:
    1. Users (independent)
    2. [Add more models here as they're created]

Example:
    # Create all fake data with defaults
    python manage.py create_fake_data
    
    # Create with custom quantities
    python manage.py create_fake_data --users 100
    
    # Skip certain entities
    python manage.py create_fake_data --skip-users
"""
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create fake data for all entities in the correct order'
    
    def add_arguments(self, parser):
        # Users
        parser.add_argument(
            '--users',
            type=int,
            default=20,
            help='Number of users to create (default: 20)'
        )
        parser.add_argument(
            '--password',
            type=str,
            default='password123',
            help='Password for fake users (default: password123)'
        )
        parser.add_argument(
            '--skip-users',
            action='store_true',
            help='Skip user creation'
        )

        # Portfolio
        parser.add_argument('--categories', type=int, default=6, help='Number of categories to create (default: 6)')
        parser.add_argument('--skip-categories', action='store_true', help='Skip categories')
        parser.add_argument('--styles', type=int, default=6, help='Number of styles to create (default: 6)')
        parser.add_argument('--skip-styles', action='store_true', help='Skip styles')
        parser.add_argument('--spaces', type=int, default=10, help='Number of spaces to create (default: 10)')
        parser.add_argument('--skip-spaces', action='store_true', help='Skip spaces')
        parser.add_argument('--projects', type=int, default=20, help='Number of projects to create (default: 20)')
        parser.add_argument('--skip-projects', action='store_true', help='Skip projects')

        # Blog
        parser.add_argument('--tags', type=int, default=12, help='Number of tags to create (default: 12)')
        parser.add_argument('--skip-tags', action='store_true', help='Skip tags')
        parser.add_argument('--posts', type=int, default=15, help='Number of posts to create (default: 15)')
        parser.add_argument('--skip-posts', action='store_true', help='Skip posts')

        # Services
        parser.add_argument('--services', type=int, default=8, help='Number of services to create (default: 8)')
        parser.add_argument('--skip-services', action='store_true', help='Skip services')
        parser.add_argument('--skip-process-steps', action='store_true', help='Skip process steps')

        # Leads
        parser.add_argument('--leads', type=int, default=30, help='Number of leads to create (default: 30)')
        parser.add_argument('--skip-lead-statuses', action='store_true', help='Skip lead statuses')
        parser.add_argument('--skip-leads', action='store_true', help='Skip leads')

        # Site singletons
        parser.add_argument('--skip-site', action='store_true', help='Skip site singleton population (settings/home/about)')
        
        # Add more arguments for other models as they're created
        # Example:
        # parser.add_argument('--products', type=int, default=50, help='Number of products')
        # parser.add_argument('--skip-products', action='store_true', help='Skip products')
    
    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write(self.style.SUCCESS('🚀 Starting fake data creation...'))
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write('')

        # Track created entities
        created_entities = []
        
        # =========================================================================
        # PHASE 1: Independent Entities (no dependencies)
        # =========================================================================
        
        self.stdout.write(self.style.HTTP_INFO('📦 Phase 1: Creating independent entities'))
        self.stdout.write('')
        
        # Users
        if not options['skip_users']:
            self.stdout.write('� Creating users...')
            try:
                call_command(
                    'create_fake_users',
                    num=options['users'],
                    password=options['password'],
                    stdout=self.stdout
                )
                created_entities.append(f"✅ {options['users']} users")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating users: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped users'))

        # Portfolio taxonomies
        if not options['skip_categories']:
            self.stdout.write('📁 Creating categories...')
            try:
                call_command('create_fake_categories', num=options['categories'], stdout=self.stdout)
                created_entities.append(f"✅ {options['categories']} categories")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating categories: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped categories'))

        if not options['skip_styles']:
            self.stdout.write('� Creating styles...')
            try:
                call_command('create_fake_styles', num=options['styles'], stdout=self.stdout)
                created_entities.append(f"✅ {options['styles']} styles")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating styles: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped styles'))

        if not options['skip_spaces']:
            self.stdout.write('🏠 Creating spaces...')
            try:
                call_command('create_fake_spaces', num=options['spaces'], stdout=self.stdout)
                created_entities.append(f"✅ {options['spaces']} spaces")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating spaces: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped spaces'))

        # Blog tags
        if not options['skip_tags']:
            self.stdout.write('🏷️  Creating tags...')
            try:
                call_command('create_fake_tags', num=options['tags'], stdout=self.stdout)
                created_entities.append(f"✅ {options['tags']} tags")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating tags: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped tags'))

        # Services
        if not options['skip_services']:
            self.stdout.write('🧰 Creating services...')
            try:
                call_command('create_fake_services', num=options['services'], stdout=self.stdout)
                created_entities.append(f"✅ {options['services']} services")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating services: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped services'))

        # Process steps
        if not options['skip_process_steps']:
            self.stdout.write('🧭 Creating process steps...')
            try:
                call_command('create_fake_process_steps', stdout=self.stdout)
                created_entities.append('✅ process steps')
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating process steps: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped process steps'))

        # Lead statuses
        if not options['skip_lead_statuses']:
            self.stdout.write('📌 Creating lead statuses...')
            try:
                call_command('create_fake_lead_statuses', stdout=self.stdout)
                created_entities.append('✅ lead statuses')
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating lead statuses: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped lead statuses'))
        
        self.stdout.write('')
        
        # =========================================================================
        # PHASE 2: Entities with Single Dependency
        # =========================================================================

        self.stdout.write(self.style.HTTP_INFO('📦 Phase 2: Creating entities with dependencies'))
        self.stdout.write('')

        # Projects (depends on portfolio taxonomies)
        if not options['skip_projects']:
            self.stdout.write('📸 Creating projects...')
            try:
                call_command('create_fake_projects', num=options['projects'], stdout=self.stdout)
                created_entities.append(f"✅ {options['projects']} projects")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating projects: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped projects'))

        # Blog posts (depends on users + tags)
        if not options['skip_posts']:
            self.stdout.write('� Creating posts...')
            try:
                call_command('create_fake_posts', num=options['posts'], stdout=self.stdout)
                created_entities.append(f"✅ {options['posts']} posts")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating posts: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped posts'))

        # Leads
        if not options['skip_leads']:
            self.stdout.write('📨 Creating leads...')
            try:
                call_command('create_fake_leads', num=options['leads'], stdout=self.stdout)
                created_entities.append(f"✅ {options['leads']} leads")
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error creating leads: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped leads'))

        # Site singletons
        if not options['skip_site']:
            self.stdout.write('🧩 Populating site singletons...')
            try:
                call_command('create_fake_site_settings', stdout=self.stdout)
                call_command('create_fake_home_page', stdout=self.stdout)
                call_command('create_fake_about_page', stdout=self.stdout)
                created_entities.append('✅ site singletons')
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'   ❌ Error populating site singletons: {e}'))
        else:
            self.stdout.write(self.style.WARNING('   ⏭️  Skipped site singletons'))
        
        # =========================================================================
        # PHASE 3: Entities with Multiple Dependencies
        # =========================================================================
        # No additional entities currently
        
        # =========================================================================
        # Summary
        # =========================================================================
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write(self.style.SUCCESS('✅ Fake data creation completed!'))
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write('')
        
        if created_entities:
            self.stdout.write(self.style.SUCCESS('📊 Summary:'))
            for entity in created_entities:
                self.stdout.write(f'   {entity}')
        else:
            self.stdout.write(self.style.WARNING('   ⚠️  No entities were created (all skipped)'))
        
        self.stdout.write('')
        self.stdout.write(self.style.HTTP_INFO('💡 Tip: Use --skip-<entity> to skip specific entities'))
        self.stdout.write(self.style.HTTP_INFO('   Example: python manage.py create_fake_data --skip-users'))
        self.stdout.write('')
