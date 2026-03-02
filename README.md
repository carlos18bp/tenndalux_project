# TenndaluX Project

**Modern Fullstack Architecture**  
Backend: Django REST Framework + JWT  
Frontend: Next.js 14+ + TypeScript + Tailwind CSS

---

## 🏗️ Architecture

This project implements a fullstack architecture following corporate standards defined in the architecture guide.

### Backend (Django REST Framework)
- ✅ Custom User model with email authentication
- ✅ JWT authentication with refresh tokens
- ✅ Modular structure (models, serializers, views, urls by module)
- ✅ Customized Django Admin
- ✅ **django_attachments** - Image gallery system with drag & drop
- ✅ Management commands for fake data
- ✅ CORS configured for frontend
- ✅ Documentation with English DocStrings

### Frontend (Next.js + React)
- ✅ Next.js 14+ with App Router
- ✅ TypeScript for type safety
- ✅ Zustand for state management (equivalent to Pinia)
- ✅ Axios for HTTP requests with JWT auto-refresh
- ✅ Tailwind CSS for styling
- ✅ **Coming Soon page** with beautiful animations
- ✅ Protected routes with guards
- ✅ Error and loading state management

---

## 📦 Prerequisites

- Python 3.12+
- Node.js 18+
- npm or yarn

---

## 🚀 Quick Start

**New to the project?** See the complete setup guide: [`SETUP.md`](./SETUP.md)

```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser --email admin@tenndalux.com
python manage.py create_fake_data --users 10
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Open http://localhost:3000
```

---

## 📍 Access URLs

| Resource | URL | Description |
|----------|-----|-------------|
| **Frontend** | http://localhost:3000 | 🎨 **Coming Soon** page (animated) |
| **API Backend** | http://localhost:8000/api/ | REST API endpoints |
| **Django Admin** | http://localhost:8000/admin/ | Admin panel |
| **Login** | http://localhost:3000/auth/login | Login page (dev access) |
| **Register** | http://localhost:3000/auth/register | Registration page (dev access) |
| **Dashboard** | http://localhost:3000/dashboard | User dashboard (dev access) |

> **Note:** The main page (/) shows a beautiful "Coming Soon" screen with animations. 
> Authentication routes are accessible for development via buttons on the main page.

---

## 🔑 Test Credentials

### Superuser (Django Admin)
- **Email:** admin@tenndalux.com
- **Password:** *(set during createsuperuser command)*

### Fake Users (created with create_fake_users)
- **Email:** Any generated email (e.g., john.doe123@example.com)
- **Password:** password123

---

## 🖼️ Gallery System (django_attachments)

The backend includes **django_attachments**, a custom library for managing image galleries in Django Admin with drag & drop interface.

### Features
- ✅ Image gallery with drag & drop reordering
- ✅ Automatic thumbnails (easy-thumbnails)
- ✅ Automatic orphan file cleanup
- ✅ Intuitive admin interface with AJAX
- ✅ Support for multiple galleries per model

### Quick Usage

```python
# In your model
from django_attachments.fields import GalleryField

class Product(models.Model):
    name = models.CharField(max_length=255)
    gallery = GalleryField(
        related_name='products_gallery',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    
    def delete(self, *args, **kwargs):
        if self.gallery:
            self.gallery.delete()  # Cleanup files
        super().delete(*args, **kwargs)
```

### Complete Documentation
See full guide at: `/backend/django_attachments/README.md`

---

## ⚡ Fake Data Command System

The backend implements a **modular system** of commands to generate and delete test data.

### Architecture: One Command per Model

Each model has its **own independent command**:

```
management/commands/
├── create_fake_data.py         # 🎯 MASTER (orchestrator)
├── create_fake_users.py        # Command for Users
├── create_fake_products.py     # Command for Products (when created)
├── create_fake_orders.py       # Command for Orders (when created)
└── delete_fake_data.py         # Cleanup of all data
```

### Usage

```bash
# Create ALL fake data
python manage.py create_fake_data

# Customize quantities
python manage.py create_fake_data --users 50 --password testpass

# Create only users
python manage.py create_fake_users --num 20

# Skip entities
python manage.py create_fake_data --skip-users

# Delete all (requires --confirm)
python manage.py delete_fake_data --confirm
```

### Features

- ✅ **Modular:** One file per model
- ✅ **Orchestrated:** Master command respects dependencies
- ✅ **Protected:** Won't delete superusers or protected emails
- ✅ **Configurable:** Quantities and parameters per entity
- ✅ **Skip:** Omit specific entities
- ✅ **Preview:** See what will be deleted without executing

### Complete Documentation
See detailed guide at: `/backend/docs/FAKE_DATA_COMMANDS.md`

---

## 📁 Project Structure

```
tenndalux_project/
├── backend/                    # Django REST Framework
│   ├── core_project/           # Project configuration
│   │   ├── settings.py         # Settings with JWT, CORS, etc.
│   │   └── urls.py             # Main URLs
│   ├── core_app/               # Main app
│   │   ├── models/             # Models (User, etc.)
│   │   ├── serializers/        # Serializers by module
│   │   ├── views/              # API views (@api_view)
│   │   ├── urls/               # URLs by module
│   │   ├── services/           # Business logic
│   │   ├── management/         # Custom commands
│   │   │   └── commands/       # ⚡ Modular architecture
│   │   │       ├── create_fake_data.py        # MASTER command
│   │   │       ├── create_fake_users.py       # Users (independent)
│   │   │       └── delete_fake_data.py        # Global cleanup
│   │   └── admin.py            # Django Admin config
│   ├── django_attachments/     # Gallery subproject
│   ├── media/                  # Uploaded files
│   ├── static/                 # Static files
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Environment variables
│
└── frontend/                   # Next.js + TypeScript
    ├── app/                    # Next.js App Router
    │   ├── auth/               # Authentication pages
    │   │   ├── login/
    │   │   └── register/
    │   ├── dashboard/          # Protected dashboard
    │   ├── page.tsx            # Coming Soon page
    │   └── layout.tsx          # Root layout
    ├── lib/                    # Shared logic
    │   ├── services/
    │   │   └── http.ts         # HTTP service (Axios + JWT)
    │   └── stores/
    │       └── authStore.ts    # Auth store (Zustand)
    ├── components/             # Reusable components
    ├── types/                  # TypeScript types
    │   └── user.ts             # User and Auth types
    ├── .env.local              # Environment variables
    └── package.json            # Node dependencies
```

---

## 🛠️ Useful Commands

### Backend

```bash
# ========================================
# Fake Data
# ========================================

# Create ALL fake data with defaults
python manage.py create_fake_data

# Create with custom quantities
python manage.py create_fake_data --users 50 --password testpass123

# Create only one entity type
python manage.py create_fake_users --num 20

# Skip specific entities
python manage.py create_fake_data --skip-users

# Preview deletion (doesn't delete anything, just shows)
python manage.py delete_fake_data

# Delete ALL fake data (requires --confirm)
python manage.py delete_fake_data --confirm

# ========================================
# Migrations
# ========================================

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# ========================================
# Users
# ========================================

# Create superuser
python manage.py createsuperuser

# Change user password
python manage.py changepassword admin@tenndalux.com

# ========================================
# Server
# ========================================

# Run development server
python manage.py runserver

# Open Django shell
python manage.py shell

# Check configuration
python manage.py check
```

### Frontend

```bash
# Development
npm run dev

# Production build
npm run build

# Run production build
npm start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

---

## 🔐 Authentication Flow

1. **Registration:** User registers at `/auth/register`
   - Backend validates data and creates user
   - Returns JWT tokens (access + refresh)
   - Frontend stores tokens in cookies

2. **Login:** User logs in at `/auth/login`
   - Backend validates credentials
   - Returns JWT tokens
   - Frontend stores tokens and user data

3. **Authenticated Requests:**
   - All requests include header: `Authorization: Bearer {access_token}`
   - If token expires (401), automatic refresh is attempted
   - If refresh fails, redirect to login

4. **Logout:**
   - Frontend clears tokens and user data
   - Redirects to login page

---

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register/` | Register new user | No |
| POST | `/api/auth/login/` | Login | No |
| POST | `/api/auth/token/refresh/` | Refresh token | No |
| GET | `/api/auth/profile/` | Get profile | Yes |
| PATCH | `/api/auth/profile/update/` | Update profile | Yes |

---

## 🎨 Tech Stack

### Backend
- **Framework:** Django 6.0.1
- **API:** Django REST Framework 3.16.1
- **Auth:** djangorestframework-simplejwt 5.5.1
- **CORS:** django-cors-headers 4.9.0
- **Fake Data:** Faker 40.1.2

### Frontend
- **Framework:** Next.js 16.1
- **Language:** TypeScript
- **State:** Zustand
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Cookies:** js-cookie

---

## 📝 Next Steps

This project includes the **fundamentals** of the architecture. For real projects, consider adding:

- [ ] Internationalization (i18n) in frontend
- [ ] Currency management (currency store)
- [ ] More domain models (Products, Orders, etc.)
- [ ] Image gallery (django_attachments integration)
- [ ] Unit and integration tests
- [ ] Custom middleware
- [ ] Advanced pagination and filters
- [ ] Migration to MySQL in production
- [ ] Redis for cache
- [ ] Production deployment

---

---

## Environment Configuration

All secrets are loaded from `.env` via `python-decouple`. See `backend/.env.example` for the full list.

```bash
cp backend/.env.example backend/.env
# Edit .env with your values
```

### Settings Structure

| File | Purpose |
|------|---------|
| `backend/core_project/settings.py` | Base/shared settings |
| `backend/core_project/settings_dev.py` | Development: DEBUG=True, SQLite, console email |
| `backend/core_project/settings_prod.py` | Production: DEBUG=False, MySQL, SMTP, security headers |

The active environment is controlled by `DJANGO_ENV` (`development` or `production`).

---

## Task Queue

This project uses [Huey](https://huey.readthedocs.io/) with Redis for background tasks.

- **Development**: Tasks run synchronously (no Redis required).
- **Production**: Tasks run asynchronously via the Huey worker process.

### Scheduled Tasks

| Task | Schedule | Description |
|------|----------|-------------|
| `scheduled_backup` | Mondays 2:00 AM | Database and media backup with compression |
| `silk_garbage_collection` | Daily 4:00 AM | Clean Silk profiling data older than 7 days |
| `weekly_slow_queries_report` | Wednesdays 7:00 AM | Slow query and N+1 detection report |
| `silk_reports_cleanup` | 1st of month 6:30 AM | Clean old Silk report logs |

All tasks are defined in `backend/core_project/tasks.py`.

---

## Backups

Automated backups run weekly via the `scheduled_backup` Huey task. Backups are stored in the path configured by the `BACKUP_STORAGE_PATH` environment variable (default: `/var/backups/tenndalux_project/`) with 90-day retention.

Manual backup commands:

```bash
cd backend
source venv/bin/activate
python manage.py dbbackup --compress
python manage.py mediabackup --compress
```

---

## Performance Monitoring

Query profiling with [django-silk](https://github.com/jazzband/django-silk) is available behind the `ENABLE_SILK` environment variable flag.

Set `ENABLE_SILK=true` in your `.env` file to enable. Access at `/silk/` (staff users only).

Garbage collection runs daily at 4:00 AM. Weekly slow-query reports are generated Wednesdays at 7:00 AM.

---

## Documentation & Standards

Project standards and architecture guides are located in the `docs/` folder:

- `docs/DJANGO_REACT_ARCHITECTURE_STANDARD.md` — Architecture and project structure reference
- `docs/GLOBAL_RULES_GUIDELINES.md` — Development rules and engineering guidelines
- `docs/TESTING_QUALITY_STANDARDS.md` — Test quality criteria, patterns, and anti-patterns
- `docs/TEST_QUALITY_GATE_REFERENCE.md` — Quality gate tool reference and configuration
- `docs/BACKEND_AND_FRONTEND_COVERAGE_REPORT_STANDARD.md` — Coverage report standards
- `docs/E2E_FLOW_COVERAGE_REPORT_STANDARD.md` — E2E flow coverage tagging and report details
- `docs/deployment-guide.md` — Production deployment guide

Additional project-specific docs:
- [`SETUP.md`](./SETUP.md) — Complete setup instructions
- [`frontend/README.md`](./frontend/README.md) — Frontend docs (includes Vue → Next.js quick reference)
- `backend/docs/FAKE_DATA_COMMANDS.md` — Fake data command reference
- `backend/django_attachments/README.md` — Gallery system documentation

---

## Production

- **Domain**: `tenndalux.projectapp.co`
- **Services**: `tenndalux_gunicorn.service`, `tenndalux-huey.service`
- **Settings**: `DJANGO_ENV=production` activates `core_project/settings_prod.py`
- **Deploy**: See `docs/deployment-guide.md` or run `/deploy-and-check` workflow

---

## Troubleshooting

- **Backend won't start**: Verify virtual environment is activated, ensure all migrations are applied, check `.env` file.
- **Frontend won't connect to backend**: Verify backend is running on port 8000, check `CORS_ALLOWED_ORIGINS` includes `http://localhost:3000`.
- **JWT token errors**: Clear browser cookies and localStorage, logout and login again.

---

Internal Project - TenndaluX © 2026
