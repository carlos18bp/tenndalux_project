# 🚀 START HERE - Quick Navigation Guide

**Welcome to TenndaluX Project!**

This guide helps you quickly find what you need.

---

## 🎯 I Want To...

### 🆕 **Set Up the Project for the First Time**

→ **Read:** [`SETUP.md`](./SETUP.md)

This guide walks you through:
- Installing dependencies
- Creating virtual environment
- Running migrations
- Creating superuser
- Starting both servers
- Testing everything works

**Time needed:** ~15 minutes

---

### 📚 **Understand the Project Architecture**

→ **Read:** [`README.md`](./README.md)

Learn about:
- Technology stack
- Project structure
- Features implemented
- API endpoints
- Command reference

**Time needed:** ~10 minutes

---

### 🔄 **Learn Next.js (Coming from Vue)**

→ **Read:** [`/frontend/README.md`](./frontend/README.md)

Understand:
- Vue 3 vs Next.js mapping
- Component patterns
- State management (Pinia → Zustand)
- Routing differences
- Learning path

**Time needed:** ~20 minutes

---

### 🎨 **Build a New Feature**

Follow this sequence:

1. **Backend Model**
   - Create in `/backend/core_app/models/your_model.py`
   - Follow User model pattern

2. **Serializers**
   - Create in `/backend/core_app/serializers/your_serializers.py`
   - Implement: List, Detail, CreateUpdate

3. **Views**
   - Create in `/backend/core_app/views/your_views.py`
   - Use `@api_view` pattern

4. **URLs**
   - Create in `/backend/core_app/urls/your_urls.py`
   - Follow naming convention

5. **Fake Data**
   - Read: [`/backend/docs/FAKE_DATA_COMMANDS.md`](./backend/docs/FAKE_DATA_COMMANDS.md)
   - Create command per model

6. **Frontend Pages**
   - Create in `/frontend/app/your-feature/page.tsx`
   - Follow existing patterns

---

### 🖼️ **Add Image Gallery to a Model**

→ **Read:** [`/backend/django_attachments/README.md`](./backend/django_attachments/README.md)

Step-by-step guide for:
- Adding GalleryField to model
- Creating ModelForm
- Configuring Admin
- Exposing via API

**Time needed:** ~15 minutes

---

### 🎲 **Create Fake Data for Testing**

→ **Read:** [`/backend/docs/FAKE_DATA_COMMANDS.md`](./backend/docs/FAKE_DATA_COMMANDS.md)

Learn:
- One command per model pattern
- Master orchestrator
- Dependency management
- Protected records

**Quick command:**
```bash
python manage.py create_fake_data --users 20
```

---

### 🔍 **Find Specific Documentation**

→ **Read:** [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)

Complete index of:
- All documentation files
- By topic
- By file type
- By feature

---

### 🏃 **Just Run the Project (I Already Set It Up)**

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Django Admin: http://localhost:8000/admin/

---

## 📊 Project Status

**✅ What's Implemented:**
- Authentication (register, login, JWT)
- User management
- Django Admin
- Fake data system
- Gallery system (ready to use)
- Coming Soon page
- Complete documentation

**🔜 What's Next:**
- Add your domain models (Products, Orders, etc.)
- Build frontend pages
- Implement business logic

---

## 🎓 Learning Path

### Day 1: Setup & Overview
1. Follow [`SETUP.md`](./SETUP.md)
2. Skim [`README.md`](./README.md)
3. Test authentication flow
4. Explore Django Admin

### Day 2: Architecture
1. Read architecture section in [`README.md`](./README.md)
2. Read [`/frontend/README.md`](./frontend/README.md) if from Vue
3. Explore code structure
4. Read existing code

### Day 3: Fake Data System
1. Read [`/backend/docs/FAKE_DATA_COMMANDS.md`](./backend/docs/FAKE_DATA_COMMANDS.md)
2. Run commands
3. Check database
4. Understand patterns

### Day 4: Gallery System
1. Read [`/backend/django_attachments/README.md`](./backend/django_attachments/README.md)
2. Understand integration
3. Plan how to use it

### Day 5: Build Something
1. Create a simple model (e.g., Product)
2. Add fake data command
3. Create API endpoints
4. Build frontend page

---

## 📁 Quick File Reference

### Most Important Files

**Configuration:**
- Backend: `/backend/core_project/settings.py`
- Frontend: `/frontend/next.config.ts`
- Environment: `/backend/.env`, `/frontend/.env.local`

**Models:**
- User: `/backend/core_app/models/user.py`

**API:**
- Auth views: `/backend/core_app/views/auth_views.py`
- Auth URLs: `/backend/core_app/urls/auth_urls.py`

**Frontend:**
- Coming Soon: `/frontend/app/page.tsx`
- Login: `/frontend/app/auth/login/page.tsx`
- Auth store: `/frontend/lib/stores/authStore.ts`
- HTTP service: `/frontend/lib/services/http.ts`

---

## 🛠️ Common Commands

### Backend

```bash
# Start server
python manage.py runserver

# Create fake data
python manage.py create_fake_data --users 20

# Delete fake data
python manage.py delete_fake_data --confirm

# Migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### Frontend

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

---

## 🆘 Need Help?

### Troubleshooting

**Backend won't start?**
→ See [`SETUP.md`](./SETUP.md) - Troubleshooting section

**Frontend errors?**
→ See [`/frontend/README.md`](./frontend/README.md) - Troubleshooting section

**CORS issues?**
→ Check `CORS_ALLOWED_ORIGINS` in `/backend/core_project/settings.py`

### Find Documentation

**Can't find what you need?**
→ Check [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md)

**Want to see what's implemented?**
→ Read [`README.md`](./README.md)

---

## 📝 Standards

### Code Standards

- **Documentation:** English only (no Spanish)
- **Structure:** Modular (one file per entity)
- **Comments:** English DocStrings
- **Types:** TypeScript in frontend, type hints in backend

### File Naming

- **Python:** `snake_case.py`
- **TypeScript:** `camelCase.ts` or `kebab-case.tsx`
- **Folders:** `lowercase` or `kebab-case`

---

## 🎯 Quick Wins

Want to see immediate results? Try these:

### 1. Test Authentication (5 min)
1. Go to http://localhost:3000
2. Click "Pre-registro"
3. Create account
4. Login
5. See dashboard

### 2. Create Fake Users (2 min)
```bash
cd backend
source venv/bin/activate
python manage.py create_fake_data --users 10
```

### 3. Explore Django Admin (5 min)
1. Go to http://localhost:8000/admin/
2. Login with superuser
3. View users
4. See django_attachments models

### 4. Check API (2 min)
```bash
curl http://localhost:8000/api/auth/profile/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📚 All Documentation Files

```
📂 /
├── 📄 README.md                      ← Project overview
├── 📄 SETUP.md                       ← Setup guide  
├── 📄 DOCUMENTATION_INDEX.md         ← Doc index
└── 📄 START_HERE.md                  ← This file

📂 /backend/
├── 📄 django_attachments/README.md   ← Gallery system
├── 📄 docs/FAKE_DATA_COMMANDS.md     ← Fake data guide
└── 📄 core_app/management/commands/README.md

📂 /frontend/
└── 📄 README.md                      ← Frontend guide
```

---

## ✨ Key Features

- ✅ **Authentication:** Complete JWT flow
- ✅ **Admin Panel:** Customized Django Admin
- ✅ **Fake Data:** Modular command system
- ✅ **Galleries:** django_attachments ready
- ✅ **Coming Soon:** Beautiful landing page
- ✅ **Documentation:** Complete in English
- ✅ **TypeScript:** Full type safety
- ✅ **Responsive:** Mobile-friendly UI

---

## 🎉 You're Ready!

Everything is set up and documented. Choose your path above and start building!

**Recommended first read:** [`SETUP.md`](./SETUP.md)

---

**Happy Coding!** 🚀

---

**Last Updated:** February 2026
