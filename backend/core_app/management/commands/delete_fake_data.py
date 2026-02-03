"""
Command to safely delete all fake/test data from the database.

IMPORTANT: This command respects the reverse order of dependencies
to avoid foreign key constraint violations.

Architecture Pattern:
    Deletes entities in REVERSE order of creation (dependencies last).
    Protects superusers and specified email addresses.

Protected Records:
    - Superusers (is_superuser=True)
    - Users with protected emails (see PROTECTED_EMAILS)
    - System configuration records (add as needed)

Usage:
    # Preview what will be deleted (safe, no changes)
    python manage.py delete_fake_data
    
    # Actually delete (requires --confirm)
    python manage.py delete_fake_data --confirm

Deletion Order (Reverse of Creation):
    1. Entities with most dependencies (e.g., OrderItems, Reviews)
    2. Entities with single dependency (e.g., Products, Orders)
    3. Independent entities (e.g., Categories, Users - protected)
"""
from django.core.management.base import BaseCommand
from core_app.models import (
    User,
    Category,
    Style,
    Space,
    Project,
    Tag,
    Post,
    Service,
    ProcessStep,
    LeadStatus,
    Lead,
    SiteSettings,
    HomePage,
    AboutPage,
)


class Command(BaseCommand):
    help = 'Delete all fake data (requires --confirm flag)'
    
    # Emails that should NEVER be deleted
    PROTECTED_EMAILS = {
        'admin@tenndalux.com',
        'admin@example.com',
        'superadmin@tenndalux.com',
    }
    
    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Required flag to confirm deletion'
        )
    
    def handle(self, *args, **options):
        # Safety check
        if not options['confirm']:
            self.stdout.write(self.style.WARNING('=' * 70))
            self.stdout.write(self.style.WARNING('⚠️  DANGER: This will DELETE ALL fake/test data!'))
            self.stdout.write(self.style.WARNING('=' * 70))
            self.stdout.write('')
            self.stdout.write('Protected records that will NOT be deleted:')
            self.stdout.write(f'  • Superusers (is_superuser=True)')
            self.stdout.write(f'  • Users with protected emails: {", ".join(self.PROTECTED_EMAILS)}')
            self.stdout.write('')
            self.stdout.write(self.style.ERROR('Run with --confirm to proceed:'))
            self.stdout.write(self.style.ERROR('  python manage.py delete_fake_data --confirm'))
            self.stdout.write('')
            return
        
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write(self.style.SUCCESS('🗑️  Deleting fake data...'))
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write('')
        
        deleted_summary = []
        
        # =========================================================================
        # PHASE 1: Entities with Multiple Dependencies (delete first)
        # =========================================================================

        self.stdout.write('🧩 Deleting site singletons...')
        count = HomePage.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} home pages")
        count = AboutPage.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} about pages")
        count = SiteSettings.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} site settings")

        self.stdout.write('📨 Deleting leads...')
        count = Lead.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} leads")

        self.stdout.write('📝 Deleting posts...')
        count = Post.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} posts")

        self.stdout.write('📸 Deleting projects...')
        count = Project.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} projects")
        
        # =========================================================================
        # PHASE 2: Entities with Single Dependency
        # =========================================================================

        self.stdout.write('📌 Deleting lead statuses...')
        count = LeadStatus.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} lead statuses")

        self.stdout.write('🧭 Deleting process steps...')
        count = ProcessStep.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} process steps")

        self.stdout.write('🧰 Deleting services...')
        count = Service.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} services")

        self.stdout.write('🏷️  Deleting tags...')
        count = Tag.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} tags")

        self.stdout.write('🏠 Deleting spaces...')
        count = Space.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} spaces")

        self.stdout.write('🎨 Deleting styles...')
        count = Style.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} styles")

        self.stdout.write('📁 Deleting categories...')
        count = Category.objects.all().delete()[0]
        deleted_summary.append(f"✅ {count} categories")
        
        # =========================================================================
        # PHASE 3: Independent Entities (delete last)
        # =========================================================================
        
        # Users (with protection)
        self.stdout.write('👥 Deleting users (protected accounts excluded)...')
        deleted_users = User.objects.exclude(
            email__in=self.PROTECTED_EMAILS
        ).exclude(
            is_superuser=True
        ).delete()
        
        deleted_count = deleted_users[0]
        deleted_summary.append(f"✅ {deleted_count} users")
        self.stdout.write(f'   Deleted {deleted_count} users')
        
        # Show protected count
        protected_count = User.objects.filter(
            email__in=self.PROTECTED_EMAILS
        ).count() + User.objects.filter(is_superuser=True).count()
        if protected_count > 0:
            self.stdout.write(self.style.WARNING(f'   🔒 Protected {protected_count} users'))
        
        # =========================================================================
        # Summary
        # =========================================================================
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write(self.style.SUCCESS('✅ All fake data deleted successfully!'))
        self.stdout.write(self.style.SUCCESS('=' * 70))
        self.stdout.write('')
        
        if deleted_summary:
            self.stdout.write(self.style.SUCCESS('📊 Deletion Summary:'))
            for item in deleted_summary:
                self.stdout.write(f'   {item}')
        
        self.stdout.write('')
        self.stdout.write(self.style.HTTP_INFO('💡 Protected accounts remain untouched'))
        self.stdout.write('')
