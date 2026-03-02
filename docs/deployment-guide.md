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

# Frontend
cd ../frontend
npm install
npm run build

# Restart services
sudo systemctl restart tenndalux_gunicorn
sudo systemctl restart tenndalux-huey
```

## Environment Variables

All variables are loaded from `backend/.env` via `python-decouple`.
See `backend/.env.example` for the full list.
