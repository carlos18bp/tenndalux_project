---
trigger: model_decision
description: Project intelligence and lessons learned. Reference for project-specific patterns, preferences, and key insights discovered during development.
---

# Lessons Learned — Tenndalux

This file captures important patterns, preferences, and project intelligence that help work more effectively with this codebase. Updated as new insights are discovered.

---

## 1. What Tenndalux Is

A landing site + portfolio CMS for an interior design / decoration brand at `tenndalux.projectapp.co`. Features: portfolio gallery (projects organised by category, style, and space), services catalog, blog, lead capture form, and a small admin dashboard.

**Status**: ACTIVE (staging) — reactivated 2026-05-07 after a payment suspension (suspended 2026-03-17; payment resolved 2026-04-22). Runs as `tenndalux_project_staging` on `vps-projectapp-staging`, serving https://tenndalux.projectapp.co. Deploys, migrations, and service restarts are operator-run only (via the `/deploy-and-check` flow) — never run them autonomously.

---

## 2. Architecture Patterns

- **Single business app**: All models, views, serializers, and tests live in `backend/core_app/`. The Django module is `core_project`; the app is `core_app` — both intentionally generic names.
- **Model domain files**: `user.py`, `portfolio.py` (Category, Style, Space, Project), `blog.py` (Tag, Post), `services.py` (Service, ProcessStep), `leads.py` (Lead, LeadStatus), `site.py` (SiteSettings, HomePage, AboutPage).
- **`TimestampedModel` base**: All models inherit `created_at` / `updated_at`. Slug-bearing models override `save()` to call `generate_unique_slug(Model, name, instance_pk)`.
- **`SingletonModel` base**: `SiteSettings`, `HomePage`, `AboutPage` use a `SingletonModel` base — only one DB row allowed. Always call `super().save()` correctly when overriding.
- **Image attachments via `django_attachments`**: `Project`, `Service`, and `Post` use `GalleryField` / `SingleImageField` from the vendored library. Gallery integration is **partially complete** — serializers do not yet expose all fields uniformly.
- **JSON fields for short lists**: `Service.includes`, `Service.excludes`, `ProcessStep.deliverables` are `JSONField` arrays of strings. Promote to FK models only if they gain their own attributes.
- **Bilingual (incomplete)**: Some models have `*_en` / `*_es` fields but coverage is partial. `next-intl 4.8` is wired but not all components use `useTranslations()` yet.
- **Huey periodic tasks** (in `backend/core_project/tasks.py`): `scheduled_backup` Mon 02:00 UTC, `silk_garbage_collection` daily 04:00 UTC, `weekly_slow_queries_report` Wed 07:00 UTC, `silk_reports_cleanup` 1st of month 06:30 UTC.
- **Conditional Silk**: `django-silk` gated by `ENABLE_SILK=True`. Off by default.
- **Static export + Django serving**: Next.js builds to `frontend/out/`. HTML pages → `backend/templates/frontend/` (served by `frontend_views.py` which reads them as raw `HttpResponse`); `_next/` assets → `backend/static/` (served by Nginx in prod, by Django URL in dev). No Node.js in production. The `build_to_django.sh` script in `frontend/` automates the export and copy.

---

## 3. Code Style & Conventions

- **Mixed view pattern**: Auth (`auth_views.py`) uses FBV with `@api_view`. Content domains (portfolio, blog, services, leads) use `ModelViewSet` + `DefaultRouter`. Singletons (`site_views.py`) use `generics.RetrieveUpdateAPIView`. Frontend catch-all uses plain Django FBV reading HTML from `backend/templates/frontend/`. When adding endpoints, match the pattern of the domain you're extending.
- **No service layer**: `core_app/services/` is empty by design. Business logic lives in views and serializers (the codebase is small enough).
- **JWT-only auth on `/api/`**: SimpleJWT — 1-day access, 7-day refresh, rotate enabled, blacklist after rotation. `/admin/` uses session + CSRF.
- **Custom email-based User**: `User` extends `AbstractBaseUser + PermissionsMixin`. Email is the username field. Roles: `admin`, `editor`, `viewer`.
- **Settings via `DJANGO_ENV`**: `development` → SQLite + console email. `production` → MySQL + SMTP. Values loaded via `python-decouple` from `backend/.env`.
- **Frontend state — Zustand**: Stores in `frontend/lib/stores/`. `authStore.ts` uses `persist` middleware. Always call `useAuthStore.hydrate()` in a `useEffect` before reading auth state (prevents SSR/CSR mismatch).
- **HTTP via Axios wrapper**: Single instance at `frontend/lib/services/http.ts` with JWT injection and 401 auto-refresh. **Never call `fetch()` or raw `axios` directly in components.**
- **No shadcn/ui, no Material UI**: All components are custom-built. Icons: `lucide-react` + `@heroicons/react`. Animations: `framer-motion` + `gsap` + `swiper`.
- **Naming**: Backend snake_case. Frontend: stores camelCase (`authStore.ts`), components PascalCase, pages kebab-case folders + `page.tsx`.

---

## 4. Development Workflow

- **Virtual environment**: Always `cd backend && source venv/bin/activate` before backend commands.
- **Frontend dev**: `cd frontend && npm run dev` (Next.js, default :3000).
- **Frontend build**: `cd frontend && npm ci && bash build_to_django.sh` builds the static export and copies HTML → `backend/templates/frontend/`; `_next/` assets → `backend/static/_next`.
- **Fake data**: `python manage.py create_fake_data --users 10` for seeding; `python manage.py delete_fake_data --confirm` for cleanup.
- **Test execution**: Run specific files only, never the full suite. Max 20 tests or 3 commands per cycle.
- **Pre-commit**: `.pre-commit-config.yaml` runs linting before commits.

---

## 5. Testing Insights

- **Backend tests** organised by layer: `core_app/tests/models/`, `core_app/tests/views/`, `core_app/tests/serializers/`. Shared fixtures in `backend/conftest.py`.
- **Frontend unit tests** in `frontend/app/__tests__/`. Jest 29.7 + Testing Library + jsdom.
- **E2E tests** in `frontend/e2e/`. Playwright 1.42 — Desktop Chrome profile only (mobile/tablet not yet configured).
- **pytest.ini** uses `DJANGO_SETTINGS_MODULE = core_project.settings` (development, SQLite). Do not test against production MySQL.

---

## 6. User Preferences & Rules

- **Documentation language**: English across all docstrings, comments, READMEs.
- **Full responsiveness**: All new UI must be fully responsive across devices.
- **Preserve design system**: New styled components must follow existing design patterns.
- **Every new user flow must be registered** in `docs/USER_FLOW_MAP.md` and `frontend/e2e/flow-definitions.json`. Check for duplicates before registering.
- **Quality gate**: `scripts/test_quality_gate.py` validates test quality. Avoid bare `timezone.now()` in tests — use a `FIXED_NOW` constant with `monkeypatch`. `pytest.raises()` alone does not satisfy the `no_assertions` rule — always add an explicit `assert`. Wrap `IntegrityError`-raising code in `transaction.atomic()` if subsequent DB queries follow.

---

## 7. Tech Debt / Things to Be Aware Of

- `GalleryField` is partially integrated — models declare it but serializers don't expose gallery URLs uniformly.
- The Next.js static export step (`build_to_django.sh`) is operator-run (via the `/deploy-and-check` flow) — no CI deploy pipeline.
- `next-intl` is wired but not all components use `useTranslations()`.
- Silk profiling is conditional — disabled by default.
- `core_app/services/` exists but is empty — no service-layer tests needed yet.
