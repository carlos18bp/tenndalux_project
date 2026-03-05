---
description: Deploy latest master to production server for tenndalux_project
---

# Deploy tenndalux_project to Production

Run these steps on the production server at `/home/ryzepeck/webapps/tenndalux_project` to deploy the latest `master` branch.

## Pre-Deploy

// turbo
1. Quick status snapshot before deploy:
```bash
bash ~/scripts/quick-status.sh
```

## Deploy Steps

// turbo
2. Pull the latest code from master:
```bash
cd /home/ryzepeck/webapps/tenndalux_project && git pull origin master
```

3. Install backend dependencies and run migrations:
```bash
cd /home/ryzepeck/webapps/tenndalux_project/backend && source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate
```

4. Build the frontend and deploy to Django (Next.js static export → backend):
```bash
cd /home/ryzepeck/webapps/tenndalux_project/frontend && npm ci && bash build_to_django.sh
```

5. Collect static files:
```bash
cd /home/ryzepeck/webapps/tenndalux_project/backend && source venv/bin/activate && python manage.py collectstatic --noinput
```

6. Restart services:
```bash
sudo systemctl restart tenndalux_gunicorn && sudo systemctl restart tenndalux-huey
```

## Architecture Reference

- **Domain**: `tenndalux.projectapp.co`
- **Backend**: Django (`core_project` module), settings via `DJANGO_SETTINGS_MODULE=core_project.settings`
- **Frontend**: Next.js static export → `backend/templates/`
- **Services**: `tenndalux_gunicorn.service`, `tenndalux-huey.service`
- **Nginx**: `/etc/nginx/sites-available/tenndalux`
- **Socket**: `/run/tenndalux_gunicorn.sock`
- **Static**: `/home/ryzepeck/webapps/tenndalux_project/backend/staticfiles/`
- **Media**: `/home/ryzepeck/webapps/tenndalux_project/backend/media/`
- **Resource limits**: MemoryMax=350MB, CPUQuota=40%
- **Redis DB**: /4

## Notes

- `~/scripts` is a symlink to `/home/ryzepeck/webapps/ops/vps/`.
- Frontend `npm ci` may take a few minutes; the backend stays up during build.
