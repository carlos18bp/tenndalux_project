# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Tenndalux — Claude Compatibility Guide

## ⚠️ STATUS: SUSPENDED
Tenndalux is **suspended since 2026-03-17** due to non-payment. Services are stopped; database and media are preserved. Do not run deploys, migrations, or service restarts without explicit reactivation from the user.

## Source Of Truth
- The canonical repo guidance is maintained in the Codex-native surfaces: `AGENTS.md`, `backend/AGENTS.md`, `frontend/AGENTS.md`, `.agents/skills/*`, `.codex/config.toml`.
- This `CLAUDE.md` file is a compatibility mirror for mixed-tool teams and should stay aligned with the Codex guidance.
- Long-lived project context lives in top-level docs: `README.md`, `START_HERE.md`, `SETUP.md`, `CHANGE_GUIDELINES.md`, `DOCUMENTATION_INDEX.md`. There is no `docs/methodology/` Memory Bank yet.

## Project Overview
- **What it is**: Tenndalux — a landing site + portfolio CMS for an interior design / decoration brand. Features a portfolio gallery (projects organized by category, style, space), services catalog, blog, lead capture form, and a small admin dashboard.
- **Stack**: Django 6.0 + DRF (backend) / **Next.js 16.1.6 + React 19.2 + TypeScript 5** (frontend, App Router with **static export**) / MySQL 8 / Redis / Huey / SMTP email.
- **Single Django app**: `core_app`. **Django module name is `core_project`** (not `tenndalux_project`!). Settings module: `core_project.settings_prod`.
- **Production path**: `/home/ryzepeck/webapps/tenndalux_project`.
- **Domain**: `tenndalux.projectapp.co`.
- **Services**: `tenndalux_gunicorn.service` (note `_gunicorn` suffix), `tenndalux-huey.service`. Socket: `/run/tenndalux_gunicorn.sock`.
- The frontend uses Next.js **static export** (`output: 'export'`) — `next build` emits SSG to `frontend/out/`. HTML pages are deployed to `backend/templates/frontend/` (served by `frontend_views.py`); static JS/CSS assets (`_next/`) go to `backend/static/`.

## Architecture Invariants
- **Backend views follow a mixed pattern**: auth uses FBV with `@api_view`; content domains (portfolio, blog, services, leads) use `ModelViewSet` + `DefaultRouter`; singleton pages use `generics.RetrieveUpdateAPIView`; frontend catch-all uses plain Django FBV. Match the pattern of the domain you're extending.
- **Single business app `core_app`** with model files split per domain (`user.py`, `portfolio.py`, `blog.py`, `services.py`, `leads.py`, `site.py`).
- **Common base `TimestampedModel`**: all models inherit `created_at`, `updated_at`. Slug-bearing models override `save()` to call `generate_unique_slug()`.
- **Image attachments via `django_attachments`**: `GalleryField` and `SingleImageField`. Used by `Project`, `Service`, `Post`. **Note**: gallery integration is partially complete — verify the serializer surface before assuming all fields are exposed.
- **JWT-only auth on `/api/`** via SimpleJWT (1d access, 7d refresh, rotate enabled, blacklist after rotation). Admin uses session + CSRF.
- **No `services/` package** — `core_app/services/` is empty. Business logic lives in views and serializers.
- **Frontend uses Next.js 16 + React 19 + App Router** (NOT Pages Router, NOT Vue, NOT Vite SPA).
- **Static export**: `next.config.ts` uses `output: 'export'`. HTML → `backend/templates/frontend/` (Django views); assets → `backend/static/` (Nginx/Django). Server Components are limited to build-time data; per-request data must be in Client Components.
- **State management is Zustand** (with `persist` middleware for auth tokens).
- **HTTP via Axios** wrapped in `lib/services/http.ts` with token interceptors.
- **i18n via `next-intl`**: wired but **not yet fully activated** in components — bilingual coverage is incomplete.
- **No shadcn/ui, no Material UI** — components are custom-built. Icons via `lucide-react` + `@heroicons/react`. Animations via `framer-motion` + `gsap` + `swiper`.
- **Settings selection**: Controlled by `DJANGO_ENV` env var (`development` → SQLite + console email; `production` → MySQL + SMTP). Values loaded via `python-decouple` from `backend/.env` (not in git).
- **`SingletonModel`** base: `SiteSettings`, `HomePage`, `AboutPage` allow only one DB row each. Always call `super().save()` correctly when overriding `save()` on these models.
- **JSON fields for short lists**: `Service.includes`, `Service.excludes`, `ProcessStep.deliverables` are stored as JSON arrays of strings. Promote to FK models only if they gain their own attributes.
- **`useAuthStore.hydrate()`**: Must be called in every Client Component before reading auth state — prevents SSR/CSR hydration mismatch. Pattern: `useEffect(() => { useAuthStore.hydrate() }, [])`.
- **Never call `fetch()` or raw `axios` directly** in frontend code — always use the wrapped instance from `lib/services/http.ts` (handles JWT injection and 401 auto-refresh).

## Working Rules
- ⚠️ **Project is SUSPENDED** — do not run deploys, migrations, or service restarts without explicit user instruction.
- Prefer existing project patterns over generic framework advice.
- Do not rename `core_project` or `core_app` to `tenndalux_*` — keep the generic naming.
- Do not change old migrations; add new migrations when schema changes are required.
- Keep security basics intact: validated serializer inputs, ORM-first queries, escaped rendering, secure cookies, no secrets in code.
- Do not edit files inside `backend/static/` that come from the Next.js export — they are build artifacts.

## Commands
- Backend tests: `cd backend && source venv/bin/activate && pytest core_app/tests/path/to/test_file.py -v`
- Backend dev server: `cd backend && source venv/bin/activate && python manage.py runserver`
- Frontend dev server: `cd frontend && npm run dev` (Next.js, default :3000)
- Frontend unit tests (Jest): `cd frontend && npm test -- path/to/file.test.tsx`
- Frontend E2E (Playwright): `cd frontend && npx playwright test e2e/path/to/spec.ts`
- Frontend build: `cd frontend && npm run build` (static export to `frontend/out/`)
- Stage to Django: copy `frontend/out/` HTML → `backend/templates/frontend/`; copy `_next/` → `backend/static/` (no script yet)
- Migrations: `cd backend && source venv/bin/activate && python manage.py makemigrations && python manage.py migrate`
- Seed dev data: `cd backend && source venv/bin/activate && python manage.py create_fake_data --users 10`
- Clear fake data: `cd backend && source venv/bin/activate && python manage.py delete_fake_data --confirm`
- Frontend type-check: `cd frontend && npx tsc --noEmit`
- Frontend lint: `cd frontend && npm run lint`

## Testing Constraints
- Never run the full test suite.
- Maximum 20 tests per batch and 3 test commands per cycle.
- Do not run tests against the live deploy environment (project is SUSPENDED).
- Run only the smallest backend, frontend unit, or E2E slice needed for the changed behavior.

## Memory Bank
- **Not yet established.** No `docs/methodology/` and no `tasks/` directory exist.
- Long-lived project context lives in `README.md`, `START_HERE.md`, `SETUP.md`, `CHANGE_GUIDELINES.md`, `DOCUMENTATION_INDEX.md`, plus `docs/` standards files (`BACKEND_AND_FRONTEND_COVERAGE_REPORT_STANDARD.md`, `TESTING_QUALITY_STANDARDS.md`, `DJANGO_REACT_ARCHITECTURE_STANDARD.md`, `E2E_FLOW_COVERAGE_REPORT_STANDARD.md`).
- If you need to bootstrap a Memory Bank, use the `methodology-setup` skill.
<!-- session-start-protocol:begin -->
## Session Start Protocol

Al inicio de **cada sesión y antes de editar archivos**, debes invocar la skill `git-sync` para este repo. Razón: el operador trabaja desde múltiples máquinas y procesos automatizados (cron, CI) pueden haber commiteado cambios que tu copia local no tiene; editar sobre una versión desactualizada genera conflictos o trabajo duplicado.

**Flujo:**
1. Un hook `SessionStart` (definido en `.claude/settings.json`) ejecuta `git fetch + git status` read-only y te inyecta el estado de este repo como contexto.
2. Si el reporte indica `behind > 0` o `dirty > 0`, **invoca la skill `git-sync`** antes de hacer cualquier cambio. `git-sync` hace rebase contra el parent branch y, si hay conflictos, te guía interactivamente por la resolución.
3. Si el reporte indica `behind=0 ahead=0 dirty=0`, el repo ya está sincronizado y puedes proceder.

**Importante:** Nunca uses `git pull --force`, `git reset --hard` ni stash automático para "resolver" el sync — usa siempre la skill `git-sync`, que es segura y reproducible.
<!-- session-start-protocol:end -->
<!-- e2e-user-flows-protocol:begin -->
## E2E User Flows Check

Cuando termines de implementar un cambio que afecte un **flujo de usuario en el frontend** — por ejemplo:
- Crear o editar un formulario (agregar/quitar campos)
- Nueva ruta, página o vista accesible al usuario
- Cambios en flujos de autenticación, checkout, onboarding, búsqueda, perfil
- Modificaciones a `docs/USER_FLOW_MAP.md` o `frontend/e2e/flow-definitions.json`

…debes invocar la skill `e2e-user-flows-check` como **paso final** antes de reportar la implementación como completa. Esa skill audita la cobertura E2E del flujo modificado y reporta brechas/riesgos.

**Por qué:** los flujos de usuario en frontend cambian las assumptions de los tests E2E. Sin auditoría, un campo eliminado deja tests "verdes" pero inválidos, y un form nuevo queda sin cobertura.

**No aplica para:** correcciones aisladas que no cambian el flujo (typos, refactors internos, estilos puros, dependency bumps), ni cambios solo en backend que no alteren UX.

**Recordatorio automático:** un hook `Stop` revisa al cierre del turno si hay cambios uncommitted bajo `frontend/src/`, `frontend/app/`, etc., y te lo inyecta como contexto. El hook es un recordatorio, no bloqueante — la regla aplica igual aunque el hook no dispare.
<!-- e2e-user-flows-protocol:end -->
<!-- git-branch-protocol:begin -->
## Reglas de trabajo con Git: ramas y commits

**Nunca hagas commits directamente sobre `main` o `master`.** Estas ramas están protegidas y los pushes serán rechazados por GitHub. Antes de cualquier `git commit`, sigue este protocolo:

### 1. Verificar la rama actual

Antes de cualquier operación de escritura (add, commit, etc.), ejecuta:

```bash
git rev-parse --abbrev-ref HEAD
```

### 2. Si la rama actual es `main` o `master`

Antes de crear una rama nueva, **busca si ya existe una rama feature activa** para este proyecto:

```bash
git fetch --quiet --prune
# Lista ramas remotas que no son main/master/release-* ni HEAD
git branch -r | grep -vE 'origin/(HEAD|main|master|release-)' | sed 's@^[[:space:]]*origin/@@' | sort -u
```

- **Si hay UNA rama feature activa** (con PR abierto o trabajo en curso): `git checkout <rama-existente>` y haz pull rebase si está atrás del remote. Commitea ahí. No crees rama nueva.
- **Si hay VARIAS ramas feature activas**: pregunta al usuario en cuál commitear (no asumas).
- **Si NO hay ninguna rama feature activa** (todas las que ves están mergeadas/cerradas o son ramas históricas abandonadas): crea rama nueva según el formato de la sección 3.

**Por qué:** la convención del proyecto es **máximo 1 PR feature activo simultáneamente**. Todos los cambios en curso se acumulan como commits sucesivos sobre esa rama hasta que mergee. Crear ramas paralelas fragmenta el trabajo en múltiples PRs y hace difícil hacer code review unificado.

**No pidas permiso para hacer el checkout** — sólo comunícalo: "Hay rama feature activa `<X>`, voy a commitear ahí."

### 3. Formato obligatorio del nombre de rama

`<prefijo>/<DDMMYYYY>-<descripcion-corta>`

- **`<prefijo>`** según el tipo de cambio:
  - `feat` — nueva funcionalidad
  - `fix` — corrección de bug
  - `docs` — cambios en documentación
  - `refactor` — refactorización sin cambio funcional
  - `test` — añadir o modificar tests
  - `chore` — mantenimiento (dependencias, configs)
  - `style` — formato/estilo, sin cambio de lógica
  - `perf` — mejoras de rendimiento
  - `ci` — cambios en workflows o pipelines
  - `hotfix` — corrección urgente en producción

- **`<DDMMYYYY>`** debe ser la fecha actual del sistema obtenida con `date +%d%m%Y`. Nunca la asumas ni la inventes.

- **`<descripcion-corta>`** en kebab-case, máximo 5 palabras, en inglés o español según el idioma del proyecto.

### 4. Ejemplos de nombres válidos

- `feat/15052026-login-google-oauth`
- `fix/15052026-typo-readme`
- `refactor/15052026-extract-user-service`
- `docs/15052026-update-deploy-guide`
- `chore/15052026-bump-django-version`

### 5. Comandos exactos a ejecutar

```bash
# 1. Obtener la fecha del día (no asumirla)
TODAY=$(date +%d%m%Y)

# 2. Crear y moverse a la nueva rama
git checkout -b <prefijo>/${TODAY}-<descripcion-corta>

# 3. Recién entonces hacer add y commit
git add <archivos>
git commit -m "<mensaje siguiendo conventional commits>"
```

### 6. Inferencia del prefijo

Determina el prefijo a partir del contenido de los cambios:
- Archivos nuevos que añaden features → `feat`
- Cambios que arreglan comportamiento roto → `fix`
- Solo cambios en `*.md`, comentarios o JSDoc → `docs`
- Cambios en `package.json`, `requirements.txt`, configs → `chore`
- Cambios en `.github/workflows/*` → `ci`
- Archivos `*test*` / `*spec*` modificados o añadidos → `test`
- Reorganización sin alterar comportamiento → `refactor`

Si hay ambigüedad, pregunta al usuario una sola vez antes de crear la rama.

### 7. Excepciones

- Operaciones de solo lectura (`git status`, `git log`, `git diff`, `git pull`, `git fetch`) están permitidas en `main`/`master`.
- Si el usuario explícitamente pide quedarse en `main` para revisar algo sin commitear, respeta esa intención.
- Si ya estás en una rama feature válida (no `main`/`master`), no crees una nueva — continúa trabajando en ella. **Esta es la convención por defecto: 1 rama / 1 PR feature activo por proyecto a la vez.**

### 8. Mensajes de commit

Sigue Conventional Commits, con el mismo prefijo de la rama cuando aplique:

```
feat: add Google OAuth login flow
fix: correct typo in deployment README
refactor: extract user validation into service
```

### 9. Reporte final: URL del PR

Después de cada `git push` que cree una rama nueva en el remote, **siempre** termina tu respuesta dando al usuario la URL "Create a pull request" que GitHub imprime en el output del push.

- Formato: `https://github.com/<owner>/<repo>/pull/new/<branch>`.
- Inclúyela como una de las **últimas líneas** del cierre de turno, etiquetada como `PR URL: <url>`.
- Si la rama ya existía y tiene un PR abierto, reporta la URL del PR existente (usa `gh pr view --json url -q .url` si la necesitas).
- Si por excepción se commiteó directo a `main`/`master` (sólo posible en proyectos sin esta regla), declara explícitamente: "PR URL: n/a (push directo a `main`)".
- Si hubo cambios en varios proyectos en el mismo turno, entrega una **lista** con un `PR URL:` por proyecto.
<!-- git-branch-protocol:end -->
