# Frontend Rules — Next.js 16 + React 19 + App Router (Tenndalux)

> **Status: ACTIVE (staging)** — reactivated 2026-05-07 after a payment suspension (suspended 2026-03-17; payment resolved 2026-04-22); runs as `tenndalux_project_staging` on `vps-projectapp-staging`, serving https://tenndalux.projectapp.co. Dev servers and builds against the live deploy environment are **operator-run only** (the production build runs inside the `/deploy-and-check` flow) — never run them autonomously.

## Stack

- **Next.js 16.1.7** with the **App Router** (NOT Pages Router)
- **React 19.2.3**, **TypeScript 5**
- **Tailwind CSS 4** + `@tailwindcss/postcss`
- **Zustand 5.0.11** for state management
- **Axios 1.13.4** wrapped by `lib/services/http.ts` (with token interceptors via cookies)
- **next-intl 4.8.2** for ES/EN bilingual support
- **lucide-react** for icons (NOT shadcn, NOT Material UI)
- **framer-motion 12.34**, **gsap 3.14**, **swiper 12.1.2** for animations and carousels
- **js-cookie 3.0.5** for cookie persistence of auth tokens
- **Tests**: **Jest 30** + Testing Library + jsdom for unit; **Playwright 1.42** for E2E
- **Coverage**: `monocart-reporter 2.10`

This is a **Next.js + React 19 + App Router project** — **NOT Vue**, **NOT Vite SPA**, **NOT Pages Router**.

## Static Export to Django

- `next.config.ts` uses `output: 'export'` so `next build` emits SSG to **`frontend/out/`**.
- HTML pages from `frontend/out/` are deployed to `backend/templates/frontend/` (served by `frontend_views.py`); `_next/` static assets go to `backend/static/_next`. The `build_to_django.sh` script in `frontend/` automates the export and copy (`npm ci && bash build_to_django.sh`).
- The Django backend serves the static HTML files via a catch-all URL pattern handled in `core_app/views/frontend_views.py`.
- This means **Server Components are limited to build-time data**: any data that changes per request must be fetched **client-side** in `'use client'` components.
- **Do not introduce server actions or runtime SSR** — they will not work with the static export.

## Code Style and Structure

- **TypeScript-first**. Strict mode is on.
- Use **function components** with hooks. No class components.
- Use **`'use client'`** directives at the top of files that need client-side state, browser APIs, or interactive event handlers. The `(app)` group is heavily client-side because of the auth-protected layout.
- Server Components (the default in App Router) are still used for layouts and the (public) static pages.
- Co-locate types near where they are used; promote shared types to `types/` only when reused.

## Naming Conventions

- **Component files**: PascalCase (`Header.tsx`, `Hero.tsx`, `Footer.tsx`).
- **Page files**: lowercase `page.tsx` per App Router convention.
- **Layout files**: lowercase `layout.tsx`.
- **Store files**: camelCase under `lib/stores/` (`authStore.ts` is currently the main store).
- **Utilities and services**: camelCase (`http.ts`, `utils.ts`).
- **Hooks**: camelCase with `use` prefix (`useScrollAnimation.ts`).

## Routing — App Router (flat structure)

- Routes live under `app/`.
- The structure is **flat** (no `(public)/(app)/` grouped routes like Kore): top-level routes include `/`, `/auth/login`, `/auth/register`, `/blog`, `/blog/[slug]`, `/portafolio`, `/portafolio/[slug]`, `/servicios`, `/dashboard`.
- Authentication is enforced **per-page** using the `authStore.isAuthenticated` flag — there is no shared auth-gate layout. The dashboard pages check `authStore.hydrate()` themselves.
- **Do not introduce file-based routing tricks beyond what App Router provides.**

## State Management — Zustand

- All stores are in `lib/stores/`. Currently the main store is `authStore.ts`.
- Stores use the standard Zustand `create((set, get) => ({...}))` pattern, with the `persist` middleware to mirror state into localStorage in addition to cookies.
- The `authStore` includes a `hydrate()` action that reads `accessToken` and `refreshToken` from cookies. **Always call `hydrate()` in client-side layouts** before accessing auth state — otherwise SSR-rendered HTML will mismatch the client.

## HTTP — Axios via `lib/services/http.ts`

- All HTTP goes through the single Axios instance in `frontend/lib/services/http.ts`.
- Base URL: `http://localhost:8000/api` in dev, `/api` in prod.
- **Token injection**: an interceptor reads `accessToken` from `js-cookie` and sets `Authorization: Bearer <token>` on every request.
- **Token refresh**: on 401, the interceptor attempts a refresh using the `refreshToken` cookie. If refresh fails, the user is redirected to `/login`.
- **Never call `fetch()` or raw `axios` directly** in components or stores. Always use the wrapped instance.

## i18n — `next-intl` (partial)

- `next-intl 4.8.2` is **installed and configured** but **not yet fully activated** in components — bilingual coverage is incomplete.
- When adding new components, prefer `useTranslations()` from the start so the migration to full bilingual is gradual.
- **Never hardcode user-facing strings** in new code — every visible text should go through the next-intl hook.

## UI — custom components, no shadcn/MUI

- This project does **not** use shadcn/ui or Material UI. Components are custom-built in `app/components/`.
- **Icons**: `lucide-react`.
- **Animations**: `framer-motion 12.34` (`motion.div`, `useInView`), `gsap 3.14`, `swiper 12.1.2` (carousels).
- **Typography**: Cinzel and Montserrat fonts loaded in `app/layout.tsx`.

## Tailwind CSS 4

### Class Ordering
Layout → position → spacing → sizing → typography → visual → interactive.

### Responsive
Mobile-first. Breakpoint order: `sm:` → `md:` → `lg:` → `xl:` → `2xl:`.

### Avoid
- Never use `style=""` when a Tailwind class exists.
- Avoid arbitrary values (`text-[#1a1a2e]`); define design tokens in `tailwind.config.ts`.
- No `!important` (`!` prefix) unless overriding third-party styles.

## Testing — Jest + Playwright

### Jest (unit)
- Test files in `frontend/__tests__/` with `.test.tsx` or `.test.ts` extension.
- Run: `cd frontend && npm test -- path/to/file.test.tsx`
- Use **React Testing Library** + `user-event`. Prefer `screen.getByRole`, `screen.getByLabelText`, `screen.getByTestId`.
- The Jest config mocks `framer-motion`, `swiper`, and CSS modules. The environment is `jsdom`.
- Coverage excludes `.d.ts` and layouts.

### Playwright (E2E)
- Specs in `frontend/e2e/`.
- Run: `cd frontend && npx playwright test e2e/path/to/spec.ts`
- **Selector hierarchy**: `getByRole` > `getByTestId` > `locator('[data-testid=...]')`.
- **No `waitForTimeout()`** — use `toBeVisible()`, `waitForResponse()`, `waitForURL()`.

## Build → Django (static export)

- `next build` (with `output: 'export'`) emits to `frontend/out/`.
- HTML pages go to `backend/templates/frontend/` (served by `frontend_views.py`); `_next/` assets go to `backend/static/`.
- Django serves the HTML files via dedicated URL patterns in `core_app/urls/frontend_urls.py` and `core_app/views/frontend_views.py`.
- **Do not edit files inside `backend/static/` that come from the export** — they are build artifacts.

## What NOT to do

- Do **not** introduce Pages Router, server actions, or runtime SSR — the static export prevents these from working.
- Do **not** introduce shadcn/ui or Material UI — components are custom-built.
- Do **not** introduce Redux or Context API for state — Zustand is the convention.
- Do **not** call `fetch()` or raw `axios` outside of `lib/services/http.ts`.
- Do **not** hardcode user-facing strings in **new** code — use `next-intl`. (Existing components may still hardcode; that is in-progress migration debt.)
- Do **not** access auth state without calling `useAuthStore.hydrate()` first in client components.
- Do **not** introduce grouped routes `(public)/(app)/` — Tenndalux uses a flat App Router structure.
- Do **not** run dev servers or builds against the live deploy environment — it is a live client-facing environment; the production build is operator-run via the `/deploy-and-check` flow.
