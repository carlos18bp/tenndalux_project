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

## 📖 Documentation

- **Setup Guide:** [`SETUP.md`](./SETUP.md) - Complete setup instructions
- **Frontend Guide:** [`frontend/README.md`](./frontend/README.md) - Frontend docs (includes Vue → Next.js quick reference)
- **Fake Data Commands:** `/backend/docs/FAKE_DATA_COMMANDS.md`
- **Django Attachments:** `/backend/django_attachments/README.md`
- **Architecture Guide:** See root document (original guide)
- **Django Docs:** https://docs.djangoproject.com/
- **DRF Docs:** https://www.django-rest-framework.org/
- **Next.js Docs:** https://nextjs.org/docs
- **Zustand Docs:** https://docs.pmnd.rs/zustand/

---

## 🐛 Troubleshooting

### Backend won't start
- Verify virtual environment is activated
- Ensure all migrations are applied
- Check `.env` file and environment variables

### Frontend won't connect to backend
- Verify backend is running on port 8000
- Check `CORS_ALLOWED_ORIGINS` in backend `settings.py` includes `http://localhost:3000`
- Restart backend server

### JWT token errors
- Clear browser cookies and localStorage
- Logout and login again
- Verify expiration dates in `settings.py` are correct

---

## 👥 Contributing

This project follows corporate standards defined in the architecture guide. When contributing:

1. Maintain modular structure
2. Use English DocStrings for documentation
3. Follow serializer patterns (List, Detail, CreateUpdate)
4. Create management commands for fake data
5. Maintain consistency between backend and frontend

---

## 📄 License

Internal Project - TenndaluX © 2026

---

**Version:** 1.0  
**Last Updated:** February 2026
