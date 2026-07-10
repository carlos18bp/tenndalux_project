# Deployment Guide — tenndalux_project

Instructions for deploying tenndalux_project to production.

---

## Prerequisites

- Ubuntu/Debian with Python 3.12+, Node 22+, MySQL 8+, Redis, Nginx
- SSL certificate (Let's Encrypt via certbot)
- Domain: `tenndalux.projectapp.co`

---

## Deploy from master

```bash
cd /home/ryzepeck/webapps/tenndalux_project
git pull origin master

# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Frontend (bake-into-django: exports to backend/static/_next + backend/templates/frontend/)
cd ../frontend
npm ci
bash build_to_django.sh

# Restart services
sudo systemctl restart tenndalux_project
sudo systemctl restart tenndalux-huey
```

## Environment Variables

All variables are loaded from `backend/.env` via `python-decouple`.
See `backend/.env.example` for the full list.
