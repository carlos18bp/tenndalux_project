# TenndaluX Project - Setup Guide

Complete step-by-step guide to set up and run this fullstack project.

**Stack:** Django REST Framework + Next.js + TypeScript

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Python 3.12+** installed
- **Node.js 18+** and npm installed
- **Git** installed
- A terminal/command line interface

Optional but recommended:
- MySQL (for production) - currently using SQLite for development
- Redis (for caching) - optional for now

---

## 🚀 Part 1: Backend Setup (Django REST)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Create Python Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate it (Linux/Mac)
source venv/bin/activate

# Activate it (Windows)
# venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt when activated.

### Step 3: Install Python Dependencies

```bash
# Upgrade pip first
pip install --upgrade pip

# Install all requirements
pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed Django-6.1 djangorestframework-3.18.0 ...
```

### Step 4: Configure Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your settings (optional for development)
# nano .env  # or use your preferred editor
```

**Important variables in `.env`:**
- `DJANGO_SECRET_KEY` - Auto-generated, change in production
- `DJANGO_DEBUG` - Set to `False` in production
- `CORS_ALLOWED_ORIGINS` - Frontend URL (already set to localhost:3000)

### Step 5: Run Database Migrations

```bash
# Create migration files (if not exist)
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate
```

**Expected output:**
```
Applying contenttypes.0001_initial... OK
Applying auth.0001_initial... OK
Applying core_app.0001_initial... OK
...
```

### Step 6: Create Superuser (Admin Account)

```bash
python manage.py createsuperuser --email admin@tenndalux.com
```

**You'll be prompted for:**
- Email: `admin@tenndalux.com` (or your choice)
- Password: (enter a secure password)
- Password (again): (confirm)

**Important:** Remember this password! You'll need it to access Django Admin.

### Step 7: Create Fake Data (Optional)

```bash
# Create 10 test users (password: password123)
python manage.py create_fake_data --users 10

# Or create with custom password
python manage.py create_fake_data --users 20 --password testpass
```

### Step 8: Run Development Server

```bash
python manage.py runserver
```

**Expected output:**
```
Django version 6.1, using settings 'core_project.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### ✅ Backend is Running!

Test it by opening: http://localhost:8000/admin/

You should see the Django Admin login page.

---

## 🎨 Part 2: Frontend Setup (Next.js)

### Step 1: Open a NEW Terminal

Keep the backend running. Open a new terminal window/tab.

### Step 2: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 3: Install Node Dependencies

```bash
npm install
```

**Expected output:**
```
added 400+ packages in 30s
```

This will install:
- Next.js 16+
- React 19
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- And all other dependencies

### Step 4: Configure Environment (Already Done)

The file `.env.local` is already configured:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

No changes needed for local development.

### Step 5: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://10.0.2.15:3000

✓ Ready in 3s
```

### ✅ Frontend is Running!

Open your browser: http://localhost:3000

You should see the beautiful **Coming Soon** page!

---

## 🧪 Part 3: Testing the Setup

### Test 1: Coming Soon Page

1. Open http://localhost:3000
2. You should see animated gradient background
3. Click "Área de Desarrollo" button

### Test 2: Register a New User

1. Click "Pre-registro" or go to http://localhost:3000/auth/register
2. Fill the form:
   - Email: test@example.com
   - First Name: Test
   - Last Name: User
   - Password: testpass123
   - Confirm Password: testpass123
3. Click "Register"
4. You should be redirected to Dashboard

### Test 3: Login

1. Go to http://localhost:3000/auth/login
2. Login with:
   - Email: test@example.com
   - Password: testpass123
3. You should see the Dashboard

### Test 4: Django Admin

1. Go to http://localhost:8000/admin/
2. Login with your superuser credentials
3. You should see:
   - Users section
   - Django Attachments section (Libraries, Attachments)

### Test 5: API Endpoints

Test the API directly:

```bash
# Register new user
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@test.com",
    "password": "testpass123",
    "password_confirm": "testpass123",
    "first_name": "API",
    "last_name": "User"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "api@test.com",
    "password": "testpass123"
  }'
```

---

## 🔧 Common Commands Reference

### Backend Commands

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows

# Run server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Create fake data
python manage.py create_fake_data --users 20

# Delete fake data
python manage.py delete_fake_data --confirm

# Django shell
python manage.py shell

# Check for issues
python manage.py check
```

### Frontend Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

---

## 📁 What Was Created?

### Backend Structure

```
backend/
├── venv/                           # Python virtual environment
├── core_project/                   # Django project config
│   ├── settings.py                 # Main settings
│   ├── urls.py                     # URL routing
│   └── wsgi.py                     # WSGI entry point
├── core_app/                       # Main application
│   ├── models/
│   │   └── user.py                 # Custom User model
│   ├── serializers/
│   │   └── auth_serializers.py    # User serializers
│   ├── views/
│   │   └── auth_views.py          # Auth endpoints
│   ├── urls/
│   │   └── auth_urls.py           # Auth URL routing
│   ├── management/commands/        # Custom commands
│   │   ├── create_fake_data.py    # Master command
│   │   ├── create_fake_users.py   # User fake data
│   │   └── delete_fake_data.py    # Cleanup command
│   └── admin.py                    # Django Admin config
├── django_attachments/             # Gallery library
├── media/                          # Uploaded files
├── static/                         # Static files
├── db.sqlite3                      # SQLite database
└── requirements.txt                # Python dependencies
```

### Frontend Structure

```
frontend/
├── node_modules/                   # npm packages
├── app/                            # Next.js App Router
│   ├── auth/
│   │   ├── login/page.tsx         # Login page
│   │   └── register/page.tsx      # Register page
│   ├── dashboard/page.tsx         # Dashboard (protected)
│   ├── page.tsx                   # Coming Soon page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── lib/
│   ├── services/
│   │   └── http.ts                # Axios HTTP client
│   └── stores/
│       └── authStore.ts           # Zustand auth store
├── types/
│   └── user.ts                    # TypeScript types
├── components/                     # React components (empty for now)
├── .env.local                      # Environment variables
└── package.json                    # Node dependencies
```

---

## 🚨 Troubleshooting

### Backend Issues

**Issue:** `ModuleNotFoundError: No module named 'rest_framework'`

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements.txt
```

---

**Issue:** `django.db.utils.OperationalError: no such table`

**Solution:**
```bash
python manage.py migrate
```

---

**Issue:** Port 8000 already in use

**Solution:**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9

# Or run on different port
python manage.py runserver 8001
```

---

### Frontend Issues

**Issue:** `Error: Cannot find module 'next'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

**Issue:** Port 3000 already in use

**Solution:**
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or Next.js will auto-assign port 3001
```

---

**Issue:** CORS errors in browser console

**Solution:**
1. Check backend is running on port 8000
2. Verify `CORS_ALLOWED_ORIGINS` in backend `settings.py` includes `http://localhost:3000`
3. Restart backend server

---

## 📚 Next Steps

After successful setup:

1. ✅ **Explore Django Admin** - http://localhost:8000/admin/
   - View users
   - Test django_attachments (when you add models with galleries)

2. ✅ **Test Authentication Flow**
   - Register new user
   - Login
   - View dashboard
   - Logout

3. ✅ **Read Documentation**
   - `/backend/docs/FAKE_DATA_COMMANDS.md` - Fake data system
   - `/backend/django_attachments/README.md` - Gallery system
   - `/FRONTEND_COMPARISON.md` - Vue vs Next.js comparison

4. ✅ **Add New Models**
   - Create a Product model
   - Add fake data command for it
   - Create API endpoints
   - Create frontend pages

5. ✅ **Learn the Architecture**
   - Read the architecture guide (in root README)
   - Understand the modular structure
   - Follow coding standards (English docs, DocStrings)

---

## 🎯 Quick Start (TL;DR)

```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
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

**Setup Complete!** 🎉

You now have a fully functional fullstack application running locally.

For questions or issues, refer to:
- Main README.md
- Architecture guide
- Troubleshooting section above

---

**Last Updated:** February 2026
