# Tenndalux — Codex AGENTS Configuration

## Project Identity

### Codex Runtime Surfaces
- **Primary instructions**: `AGENTS.md` (root scope) + `backend/AGENTS.md` + `frontend/AGENTS.md`
- **Skills (canonical)**: `.agents/skills/<skill>/SKILL.md` + `agents/openai.yaml`
- **Project config**: `.codex/config.toml`

- **Name**: Tenndalux
- **Domain**: `tenndalux.projectapp.co` / `www.tenndalux.projectapp.co`
- **Stack**: Django 6.0+ + DRF (backend) / Next.js 16 + React 19 static export (frontend) / MySQL 8 / Redis / Huey
- **Server path**: `/home/ryzepeck/webapps/tenndalux_project`
- **Services**: `tenndalux_gunicorn.service` (Gunicorn), `tenndalux_project.socket`, `tenndalux-huey.service`
- **Settings module**: `DJANGO_SETTINGS_MODULE=core_project.settings_prod`
- **Nginx**: `/etc/nginx/sites-available/tenndalux_project`
- **Static**: `/home/ryzepeck/webapps/tenndalux_project/backend/staticfiles/`
- **Media**: `/home/ryzepeck/webapps/tenndalux_project/backend/media/`
- **Resource limits**: MemoryMax=350M, CPUQuota=40%, OOMScoreAdjust=300

---

## General Rules

These should be respected ALWAYS:
1. Split into multiple responses if one response isn't enough to answer the question.
2. IMPROVEMENTS and FURTHER PROGRESSIONS:
- S1: Suggest ways to improve code stability or scalability.
- S2: Offer strategies to enhance performance or security.
- S3: Recommend methods for improving readability or maintainability.
- Recommend areas for further investigation

---

## Security Rules — OWASP / Secrets / Input Validation

### Secrets and Environment Variables

NEVER hardcode secrets. Always use environment variables.

```python
# ✅ Django — use env vars
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']
DATABASE_URL = os.environ['DATABASE_URL']
STRIPE_API_KEY = os.environ['STRIPE_SECRET_KEY']

# ❌ NEVER do this
SECRET_KEY = 'django-insecure-abc123xyz'
DATABASE_URL = 'mysql://root:password123@localhost/mydb'
```

```typescript
// ✅ Next.js / Nuxt — use env vars
const apiUrl = process.env.NEXT_PUBLIC_API_URL
const secretKey = process.env.API_SECRET_KEY  // server-only, no NEXT_PUBLIC_ prefix

// Nuxt
const config = useRuntimeConfig()
const apiKey = config.apiSecret  // server only
const publicUrl = config.public.apiBase  // client safe

// ❌ NEVER do this
const API_KEY = 'sk-live-abc123xyz'
fetch('https://api.stripe.com/v1/charges', {
  headers: { Authorization: 'Bearer sk-live-abc123xyz' }
})
```

### .env rules

- `.env` files MUST be in `.gitignore`. Always verify before committing
- Use `.env.example` with placeholder values for documentation
- Separate env files per environment: `.env.local`, `.env.staging`, `.env.production`
- Server secrets (API keys, DB passwords) NEVER go in client-side env vars
- In Next.js: only `NEXT_PUBLIC_*` vars are exposed to the browser
- In Nuxt: only `runtimeConfig.public.*` is exposed to the browser

### Input Validation

NEVER trust user input. Validate on both server AND client.

#### Django/DRF

```python
# ✅ Serializer validates input
class OrderSerializer(serializers.Serializer):
    email = serializers.EmailField()
    quantity = serializers.IntegerField(min_value=1, max_value=100)
    product_id = serializers.IntegerField()

    def validate_product_id(self, value):
        if not Product.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError('Product not found')
        return value

# ❌ Using raw request data
def create_order(request):
    product_id = request.data['product_id']  # no validation
    Order.objects.create(product_id=product_id)  # SQL injection risk
```

#### React/Vue

```typescript
// ✅ Validate before sending
import { z } from 'zod'

const orderSchema = z.object({
  email: z.string().email(),
  quantity: z.number().int().min(1).max(100),
  productId: z.number().int().positive(),
})

const handleSubmit = (data: unknown) => {
  const result = orderSchema.safeParse(data)
  if (!result.success) {
    setErrors(result.error.flatten().fieldErrors)
    return
  }
  await submitOrder(result.data)
}
```

### SQL Injection Prevention

```python
# ✅ Django ORM — always safe
users = User.objects.filter(email=user_input)

# ✅ If raw SQL is needed, use parameterized queries
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute("SELECT * FROM users WHERE email = %s", [user_input])

# ❌ NEVER interpolate user input into SQL
cursor.execute(f"SELECT * FROM users WHERE email = '{user_input}'")
```

### XSS Prevention

```typescript
// ✅ React auto-escapes by default — JSX is safe
return <p>{userInput}</p>

// ✅ Vue auto-escapes with {{ }}
// <p>{{ userInput }}</p>

// ❌ NEVER use dangerouslySetInnerHTML with user input
return <div dangerouslySetInnerHTML={{ __html: userInput }} />

// ❌ NEVER use v-html with user input
// <div v-html="userInput" />

// If you MUST render HTML, sanitize first
import DOMPurify from 'dompurify'
const clean = DOMPurify.sanitize(userInput)
```

### CSRF Protection

```python
# ✅ Django — CSRF middleware is on by default, keep it
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',  # NEVER remove
    ...
]

# ✅ DRF — use SessionAuthentication or JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# ❌ NEVER disable CSRF globally
@csrf_exempt  # only for webhooks from external services with signature verification
```

### Authentication and Authorization

```python
# ✅ Always check permissions
from rest_framework.permissions import IsAuthenticated

class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own orders
        return Order.objects.filter(user=self.request.user)
```

### Sensitive Data Exposure

```python
# ✅ Exclude sensitive fields from serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']
        # password, tokens, internal IDs are excluded

# ❌ Exposing everything
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # leaks password hash, tokens, etc.
```

### HTTP Security Headers (Django)

```python
# settings.py — enable all security headers
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_SSL_REDIRECT = True  # in production
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
```

### Dependency Security

- Run `pip audit` (Python) and `npm audit` (Node) regularly
- Never use `*` for dependency versions — pin exact versions
- Review new dependencies before adding them
- Keep dependencies updated, especially security patches

### File Upload Security

```python
# ✅ Validate file type and size
ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.pdf'}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

def validate_upload(file):
    ext = Path(file.name).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ValidationError(f'File type {ext} not allowed')
    if file.size > MAX_FILE_SIZE:
        raise ValidationError('File too large')
```

### Security Checklist — Before Every Deployment

- [ ] No secrets in code or git history
- [ ] `.env` is in `.gitignore`
- [ ] All user input is validated (server + client)
- [ ] No raw SQL with user input
- [ ] No `dangerouslySetInnerHTML` / `v-html` with user data
- [ ] CSRF protection enabled
- [ ] Authentication required on all sensitive endpoints
- [ ] Serializers exclude sensitive fields
- [ ] Security headers configured
- [ ] `pip audit` / `npm audit` clean
- [ ] File uploads validated
- [ ] DEBUG = False in production
- [ ] ALLOWED_HOSTS configured properly

---

## ⚠️ STATUS: SUSPENDED

Tenndalux is **suspended since 2026-03-17** due to non-payment. The systemd services (`tenndalux_gunicorn.service`, `tenndalux-huey.service`) are stopped, but the **MySQL database and media files are preserved** at `/home/ryzepeck/webapps/tenndalux_project/`.

Reactivation requires the user to confirm payment status before re-enabling services. **Do not run deployments against this project without explicit instruction.**

---

## Memory Bank System

Tenndalux maintains a Memory Bank under `docs/methodology/` and `tasks/`:

- `docs/methodology/product_requirement_docs.md` — product features, user types, business context
- `docs/methodology/technical.md` — stack details, configuration, key libraries, env setup
- `docs/methodology/architecture.md` — directory structure, API routes, architectural patterns
- `docs/methodology/lessons-learned.md` — project-specific patterns and insights
- `docs/methodology/error-documentation.md` — known issues and resolved bugs
- `tasks/tasks_plan.md` — current work and task backlog
- `tasks/active_context.md` — current session context

Long-lived reference docs also live in: `README.md`, `START_HERE.md`, `SETUP.md`, `CHANGE_GUIDELINES.md`, `DOCUMENTATION_INDEX.md`, and `docs/` standards files.

---

## Directory Structure

```mermaid
flowchart TD
    Root[Project Root]
    Root --> Backend[backend/ — Django + DRF]
    Root --> Frontend[frontend/ — Next.js 16 + React 19 with static export]
    Root --> Docs[docs/]
    Root --> Scripts[scripts/]
    Root --> AgentSkills[.agents/skills/]

    Backend --> BCoreApp[core_app/ — single business app]
    Backend --> BCoreProj[core_project/ — Django project module]
    Backend --> BConftest[conftest.py + pytest.ini]
    Backend --> BMedia[media/ + staticfiles/]

    BCoreApp --> Models[models/ — User, Project, Post, Service, Lead, Tag, Category, Style, Space, ProcessStep, SiteSettings, HomePage, AboutPage]
    BCoreApp --> Views[views/ — auth: FBV @api_view | portfolio/blog/services/leads: ModelViewSet | site: generics CBV | frontend: plain FBV]
    BCoreApp --> Tests[tests/ — pytest]

    Frontend --> FApp[app/ — Next.js App Router]
    FApp --> FPages[page.tsx + auth/login, auth/register, blog/, portafolio/, servicios/, dashboard/]
    Frontend --> FLib[lib/ — services/http.ts, stores/authStore.ts]
    Frontend --> FComponents[components/]
    Frontend --> FOut[out/ — HTML → backend/templates/frontend/ | assets → backend/static/]

    AgentSkills --> SkillSet[plan, implement, debug, deploy-and-check, deploy-staging, git-commit, etc.]
```

**Important note on naming**: like `kore_project`, the **Django project module is `core_project`** (not `tenndalux_project`!) and the **Django app is `core_app`** (not `tenndalux_app`!). The directory `tenndalux_project/` is just the repo location. Settings module is `core_project.settings_prod`. Do not rename these to `tenndalux_*` — keep the `core_*` naming.

The systemd unit name is **`tenndalux_gunicorn.service`** (note the `_gunicorn` suffix, unlike most projects that use `<project>.service`).

---

## Testing Rules

### Execution Constraints

- **Never run the full test suite** — always specify files.
- **Maximum per execution**: 20 tests per batch, 3 commands per cycle.
- **Backend**: `cd backend && source venv/bin/activate && pytest core_app/tests/path/to/test_file.py -v`. `pytest.ini` sets `DJANGO_SETTINGS_MODULE=core_project.settings`.
- **Frontend unit (Jest)**: `cd frontend && npm test -- path/to/file.test.tsx`. Config: `jest.config.cjs` with jsdom.
- **Frontend E2E (Playwright 1.42)**: `cd frontend && npx playwright test e2e/path/to/spec.ts` — max 2 files per invocation. Use `E2E_REUSE_SERVER=1` when a Next.js dev server is already running.

> **Note**: because the project is currently SUSPENDED, do not run tests against the live deploy environment.

### Quality Standards

Full reference: `docs/TESTING_QUALITY_STANDARDS.md`

- Each test verifies **ONE specific behavior**
- **No conjunctions** in test names — split into separate tests
- Assert **observable outcomes** (status codes, DB state, rendered UI)
- **No conditionals** in test body — use parameterization
- Follow **AAA pattern**: Arrange → Act → Assert
- Mock only at **system boundaries** (external APIs, clock, email)

---

## Lessons Learned — Tenndalux

### What Tenndalux is

A landing site + portfolio CMS for an interior design / decoration brand at `tenndalux.projectapp.co`. Features: portfolio gallery (projects organized by category, style, and space), services catalog, blog, lead capture form, and a small admin dashboard for content management.

### Architecture Patterns

#### Single business app: `core_app`
- All models, views, serializers, and tests live in `backend/core_app/`.
- The Django **module** is `core_project` and the **app** is `core_app` — both intentionally generic (the same naming as `kore_project`, but the codebases are different).
- Models are organized under `core_app/models/` (one file per model): `user.py`, `portfolio.py` (Category, Style, Space, Project), `blog.py` (Tag, Post), `services.py` (Service, ProcessStep), `leads.py` (Lead, LeadStatus), `site.py` (SiteSettings, HomePage, AboutPage).

#### Common base: `TimestampedModel`
- All models inherit from `TimestampedModel` which provides `created_at` and `updated_at`.
- Slug-bearing models override `save()` to call `generate_unique_slug(Model, name, instance_pk)` — slugs are auto-generated from the name field, with conflict resolution.

#### Image attachments via `django_attachments`
- `Project`, `Service`, and `Post` use `GalleryField` (multi-image) and `SingleImageField` (single image) from the vendored `django_attachments` library.
- Note from exploration: the `GalleryField` integration is **partially complete** — the models declare it but the serializers do not yet expose all fields. If you touch this area, verify the serializer surface.

#### JSON fields for unstructured lists
- `Service.includes` and `Service.excludes` are `JSONField` lists of strings (no separate model).
- `ProcessStep.deliverables` is also a `JSONField` list.
- Use these for unordered short text lists; create proper FK models if the data grows attributes.

#### Bilingual potential (not fully implemented)
- Some models have `*_en` / `*_es` fields, but bilingual coverage is **incomplete**. Frontend i18n with `next-intl` is wired but not all components use it yet.

#### Custom email-based User
- `User` extends `AbstractBaseUser + PermissionsMixin` with email as the username field, custom `UserManager`, roles `admin`/`editor`/`viewer`, optional avatar and phone.

#### JWT-only auth
- The repo uses **JWT via SimpleJWT** for `/api/`. There is **no Django session auth on the API** — `/admin/` is the only session-based surface.
- `SimpleJWT` config: access 1 day, refresh 7 days, rotate enabled, blacklist after rotation.

#### Huey periodic tasks (in `backend/core_project/tasks.py`)
- `scheduled_backup` — Mon 02:00 UTC (DB + media, weekly retention).
- `silk_garbage_collection` — daily 04:00 UTC.
- `weekly_slow_queries_report` — Wed 07:00 UTC.
- `silk_reports_cleanup` — 1st of month 06:30 UTC.

#### Conditional Silk
- `django-silk` is gated by `ENABLE_SILK=True`. Off by default.

### Code Style & Conventions

#### Backend: mixed view pattern by domain
The project uses different DRF view styles depending on the resource type — match the pattern of the domain you're extending:
- **Auth** (`auth_views.py`): FBV with `@api_view` — register, login, token refresh, profile GET/PATCH.
- **Content domains** (`portfolio_views.py`, `blog_views.py`, `services_views.py`, `leads_views.py`): `ModelViewSet` with `DefaultRouter` — full CRUD for Category/Style/Space/Project, Tag/Post, Service/ProcessStep, LeadStatus/Lead.
- **Singleton pages** (`site_views.py`): `generics.RetrieveUpdateAPIView` — retrieve/update for `SiteSettings`, `HomePage`, `AboutPage` via the `.load()` singleton accessor.
- **Frontend catch-all** (`frontend_views.py`): plain Django FBV (no DRF) — reads HTML files from `backend/templates/frontend/` and returns `HttpResponse`.
- There is **no `services/` package** — business logic lives in serializers and view methods (the codebase is small enough).

#### Frontend: Next.js 16 + React 19 + App Router + static export
- **Stack**: Next.js 16.1.6, React 19.2.3, TypeScript 5.
- **App Router** in `frontend/app/`.
- **Static export**: `next.config.ts` uses `output: 'export'` so `next build` emits SSG to `frontend/out/`. HTML pages are copied to `backend/templates/frontend/` (served by `frontend_views.py`); static assets (`_next/`) go to `backend/static/`. No `build_to_django.sh` script exists yet — the copy is currently a manual step.
- This means **Server Components are limited to build-time data**. Anything that needs per-request data must be a Client Component.

#### Frontend: state management with Zustand
- Stores live in `frontend/lib/stores/` (`authStore.ts`).
- The `authStore` uses `persist` middleware to keep tokens in localStorage in addition to cookies.
- Naming: camelCase (`authStore.ts`).

#### Frontend: HTTP via Axios
- The single Axios instance is `frontend/lib/services/http.ts`.
- Interceptors handle JWT injection (from cookies) and automatic refresh on 401.
- **Do not call `fetch()` or raw `axios` directly in components.** Always use the wrapped instance.

#### Frontend: i18n with `next-intl`
- `next-intl 4.8.2` is installed and configured but **not yet fully activated** in components — bilingual coverage is incomplete.
- When adding new components, prefer `useTranslations()` from the start.

#### Frontend: UI with Tailwind + Lucide
- **No shadcn/ui, no Material UI** — components are custom-built.
- **Icons**: `lucide-react 0.574` and `@heroicons/react 2.2`.
- **Animations**: `framer-motion 12.34`, `gsap 3.14`, `swiper 12.1.1` (carousels).
- Custom hook: `useScrollAnimation` for scroll-triggered effects.

#### Naming
- Stores: camelCase (`authStore.ts`).
- Components: PascalCase (`Header.tsx`, `Hero.tsx`).
- Pages: kebab-case folders + `page.tsx` per App Router convention.
- Layouts: `layout.tsx`.

### Development Workflow

#### venv lives in `backend/`
```bash
cd backend && source venv/bin/activate
```

#### Frontend dev server
```bash
cd frontend && npm install && npm run dev   # Next.js dev, default :3000
```

### Production Deployment (when reactivated)

When the project is reactivated, the deploy sequence is:
1. `git pull origin master`
2. Backend: `cd backend && source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate`
3. Frontend: `cd frontend && npm ci && npm run build` (Next.js static export → `frontend/out/`)
4. Manually copy: HTML pages from `frontend/out/` → `backend/templates/frontend/`; `_next/` assets → `backend/static/`. (No `build_to_django.sh` script exists yet.)
5. Backend: `python manage.py collectstatic --noinput`
6. Restart: `sudo systemctl restart tenndalux_gunicorn && sudo systemctl restart tenndalux-huey`
7. Verify: `bash /home/ryzepeck/webapps/ops/vps/scripts/deployment/post-deploy-check.sh tenndalux_project`

⚠️ **Currently the project is SUSPENDED** — do not run any of the above without explicit confirmation that payment has been resolved.

### Testing Insights

- **Backend**: pytest 9 + pytest-django + pytest-cov. Tests under `backend/core_app/tests/`. Faker for test data.
- **Frontend unit**: Jest 29.7 + Testing Library + jsdom.
- **Frontend E2E**: Playwright 1.42 in `frontend/e2e/`, profiles for Desktop Chrome, Mobile Chrome, Tablet.
- The `core_app/services/` directory exists but is empty — no service-layer tests yet.

### Tech Debt / Things to Be Aware Of

- `GalleryField` is partially integrated — models declare it but serializers don't yet expose the gallery URLs uniformly.
- The Next.js static export step is **manual** (`build_to_django.sh`) — there is no CI deploy pipeline yet.
- `next-intl` is wired but not all components use `useTranslations()`.
- Silk profiling is conditional — disabled by default.

---

## Error Documentation — Tenndalux

### Known Issues

#### [KNOWN-001] Project is suspended (2026-03-17)
- **Context**: services stopped due to non-payment. DB and media preserved.
- **Workaround**: do not run deploys, migrations, or service restarts. Wait for explicit reactivation.

### Resolved Issues

_No resolved issues recorded yet. When fixing a non-trivial bug, document the root cause and resolution here:_

```
#### [ERR-NNN] short title
- ...
- **Resolution**: ...
```
