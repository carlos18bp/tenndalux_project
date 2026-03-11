---
description: Deploy latest master to production server for tenndalux_project
---

> Execute these steps connected to the production server via SSH.
> Base path: `/home/ryzepeck/webapps/tenndalux_project`
> Do NOT run locally.

# Deploy tenndalux_project to Production

Run these steps on the production server at `/home/ryzepeck/webapps/tenndalux_project` to deploy the latest `master` branch.

## Pre-Deploy

1. Quick status snapshot before deploy:
```bash
bash ~/scripts/quick-status.sh
```

## Deploy Steps

2. Pull the latest code from master:
```bash
cd /home/ryzepeck/webapps/tenndalux_project && git pull origin master
```

3. Install backend dependencies and run migrations:
```bash
cd /home/ryzepeck/webapps/tenndalux_project/backend && source venv/bin/activate && pip install -r requirements.txt && DJANGO_SETTINGS_MODULE=core_project.settings_prod python manage.py migrate
```

4. Build the frontend (Next.js static export + copy to Django):
```bash
cd /home/ryzepeck/webapps/tenndalux_project/frontend && npm ci && bash build_to_django.sh
```

5. Collect static files:
```bash
cd /home/ryzepeck/webapps/tenndalux_project/backend && source venv/bin/activate && DJANGO_SETTINGS_MODULE=core_project.settings_prod python manage.py collectstatic --noinput
```

6. Restart services:
```bash
sudo systemctl restart tenndalux_gunicorn && sudo systemctl restart tenndalux-huey
```

## Post-Deploy Verification

7. Run post-deploy check for tenndalux_project:
```bash
bash ~/scripts/post-deploy-check.sh tenndalux_project
```
Expected: PASS on all checks, FAIL=0.

8. If something fails, check the logs:
```bash
sudo journalctl -u tenndalux_gunicorn.service --no-pager -n 30
sudo journalctl -u tenndalux-huey.service --no-pager -n 30
sudo tail -20 /var/log/nginx/error.log
```

## Architecture Reference

- **Domain**: `tenndalux.projectapp.co`
- **Backend**: Django (`core_project` module), settings selected via `DJANGO_SETTINGS_MODULE=core_project.settings_prod`
- **Frontend**: Next.js 14+ SSG → `backend/static/` (JS/CSS) + `backend/templates/frontend/` (HTML) via `build_to_django.sh`
- **Services**: `tenndalux_gunicorn.service` (Gunicorn), `tenndalux-huey.service` (task queue)
- **Nginx**: `/etc/nginx/sites-available/` (tenndalux config)
- **Static**: `/home/ryzepeck/webapps/tenndalux_project/backend/staticfiles/`
- **Media**: `/home/ryzepeck/webapps/tenndalux_project/backend/media/`

## Notes

- `~/scripts` is a symlink to `/home/ryzepeck/webapps/ops/vps/`.
- Frontend uses `bash build_to_django.sh` which runs `npx next build` (static export) and copies HTML to `backend/templates/frontend/` and JS/CSS assets to `backend/static/`.
- `DJANGO_SETTINGS_MODULE=core_project.settings_prod` must be set for migrate and collectstatic (manage.py defaults to settings_dev).
- Git branch is `master` (not `main`).
