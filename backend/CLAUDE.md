# Backend Rules — Tenndalux

## Status: ACTIVE (staging)
Tenndalux is **active** — reactivated 2026-05-07 after a payment suspension (suspended 2026-03-17; payment resolved 2026-04-22). Runs as `tenndalux_project_staging` on `vps-projectapp-staging`, serving https://tenndalux.projectapp.co. Deploys, migrations, and service restarts are **operator-run only** (via the `/deploy-and-check` flow) — never run them autonomously.

## Stack And Scope
- Django 6.0 + DRF 3.14+, Python 3.12+.
- **Single business app**: `core_app` — contains all models, views, serializers, and tests.
- **Django project module**: `core_project` (not `tenndalux_project`!). Settings module: `core_project.settings_prod`.
- Database: **MySQL 8** (production). Cache + queue: Redis. Email: SMTP.
- Auth: **JWT via SimpleJWT** for `/api/`, session for admin only.

## Project Conventions
- DRF views follow a **mixed pattern** — match the domain you're working in:
  - **Auth** (`auth_views.py`): FBV with `@api_view` — register, login, profile.
  - **Content** (portfolio, blog, services, leads): `ModelViewSet` with `DefaultRouter`.
  - **Singletons** (`site_views.py`): `generics.RetrieveUpdateAPIView`.
  - **Frontend** (`frontend_views.py`): plain Django FBV serving HTML from `backend/templates/frontend/`.
  When adding endpoints, extend the pattern already present in that view file.
- Models inherit from a common `TimestampedModel` base (`created_at`, `updated_at`).
- Slug-bearing models override `save()` to call `generate_unique_slug(Model, name, instance_pk)` for auto-generation with conflict resolution.
- Image attachments use **`django_attachments`** library: `GalleryField` (multi-image) and `SingleImageField` (single image). Used by `Project`, `Service`, and `Post`.
- **JSON fields for unstructured short lists**: `Service.includes`, `Service.excludes`, `ProcessStep.deliverables`. Promote to FK models if the data grows attributes.
- **No `services/` package** — `core_app/services/` exists but is empty. Business logic lives in views and serializers (the codebase is small).
- **Custom email-based User**: `User(AbstractBaseUser, PermissionsMixin)` with email as the username field, custom `UserManager`, roles `admin`/`editor`/`viewer`.
- **Bilingual is incomplete**: some models have `*_en`/`*_es` fields but coverage is partial. Verify before assuming bilingual support.
- Prefer Django ORM. Raw SQL only when strictly necessary, always parameterized.

## Auth And Security
- **`/api/` uses JWT via SimpleJWT** — access 1 day, refresh 7 days, rotate enabled, blacklist after rotation. **No CSRF on `/api/`** because JWT is stateless.
- **`/admin/` uses Django session + CSRF**.
- `settings_prod.py` enforces HSTS (1y, subdomains, preload), `SECURE_SSL_REDIRECT=True`, secure cookies, NOSNIFF, `X_FRAME_OPTIONS=DENY`. Fail-fast if `DJANGO_SECRET_KEY` or `DJANGO_ALLOWED_HOSTS` are missing.
- Email backend: SMTP (env-driven).
- Validate input in DRF serializers. Never disable CSRF or hardcode secrets.

## Commands
- Activate venv from `backend/`: `cd backend && source venv/bin/activate`
- Run backend tests: `pytest core_app/tests/path/to/test_file.py -v`
- Run a focused backend check: `python manage.py check`
- Run dev server: `python manage.py runserver`
- Make migrations: `python manage.py makemigrations core_app && python manage.py migrate`

## Testing Rules
- Run only the changed test file or a tight regression slice.
- Never run the full backend suite.
- Keep test names focused on one observable behavior.
- Prefer deterministic tests: freeze time, seed data explicitly, and avoid hidden global state.
- Faker is used for fixture data.

## Quirks to Remember
- The Django **module is `core_project`**, not `tenndalux_project` — `DJANGO_SETTINGS_MODULE=core_project.settings_prod`.
- The systemd units are **`tenndalux_project.service`** (gunicorn) and **`tenndalux-huey.service`** (huey).
- The `core_app/services/` directory is empty by design — there is no service layer yet.
- `GalleryField` integration is partial — verify serializer surface before assuming all gallery fields are exposed.
