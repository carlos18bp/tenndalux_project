# Frontend Rules — Tenndalux

> **⚠️ Project is SUSPENDED since 2026-03-17.** Do not run dev servers or builds against the live deploy environment without explicit reactivation.

## Stack And Scope
- **Next.js 16.1.6 + React 19.2 + TypeScript** with the **App Router** (NOT Pages Router, NOT Vue, NOT Vite SPA).
- **Static export** (`output: 'export'` in `next.config.ts`) — `next build` emits SSG to `frontend/out/`. A shell script (`scripts/build_to_django.sh`) copies the output into `backend/static/`. There is no runtime SSR.
- **State management**: **Zustand 5.0** with `persist` middleware (NOT Redux, NOT Context API for global state). Stores in `lib/stores/`.
- **HTTP**: **Axios 1.13** wrapped in `lib/services/http.ts` with cookie-based JWT injection and automatic refresh on 401.
- **i18n**: **next-intl 4.8** is installed but **not yet fully activated** in components — bilingual coverage is incomplete.
- **Styling**: Tailwind CSS 4.
- **UI components**: custom-built (NOT shadcn, NOT Material UI). Icons via `lucide-react` + `@heroicons/react`. Animations via `framer-motion 12.34` + `gsap 3.14` + `swiper 12.1.1`.
- **Tests**: **Jest 29.7** + Testing Library + jsdom for unit; **Playwright 1.42** for E2E (Desktop Chrome, Mobile Chrome, Tablet profiles).

## Project Conventions
- **TypeScript-first**. Strict mode. Function components with hooks.
- Use **`'use client'`** at the top of files that need interactivity, browser APIs, or auth state.
- **Static export constraints**: data that changes per request must be fetched **client-side**. Do not introduce server actions or runtime SSR.
- **Flat App Router structure** (no `(public)/(app)` grouped routes): top-level routes are `/`, `/auth/login`, `/auth/register`, `/blog`, `/blog/[slug]`, `/portafolio`, `/portafolio/[slug]`, `/servicios`, `/dashboard`. Authentication is enforced **per-page**, not via a shared layout.
- **Auth hydration**: client components must call `useAuthStore.hydrate()` before reading auth state to avoid Next.js hydration mismatches. The store reads tokens from cookies + localStorage (via `persist`).
- **HTTP via `lib/services/http.ts`**: never call `fetch()` or raw `axios` directly. The wrapped instance handles token injection, refresh on 401, and base URL switching.
- **Filename conventions**:
  - Stores → camelCase (`authStore.ts`).
  - Components → PascalCase (`Header.tsx`, `Hero.tsx`).
  - Pages → `page.tsx`. Layouts → `layout.tsx`.
  - Hooks → camelCase with `use` prefix (`useScrollAnimation.ts`).
  - Utilities → camelCase.
- **Bilingual strings**: when adding new components, prefer `next-intl`'s `useTranslations()` from the start. Existing components may still hardcode text — that is in-progress migration debt.

## UX And Routing
- App Router is the only routing mechanism. Do **not** introduce Pages Router or file-based routing tricks.
- The structure is flat — no grouped routes. Auth is checked per-page, not via a shared `(app)` layout.
- For Playwright and async UI work, prefer **role-based locators** and **explicit element waits**.
- Do **not** use `networkidle` for Next.js dev flows.

## Commands
- Dev server: `cd frontend && npm run dev` (Next.js, default :3000)
- Unit tests (Jest): `cd frontend && npm test -- path/to/file.test.tsx`
- E2E (Playwright): `cd frontend && npx playwright test e2e/path/to/spec.ts`
- Build: `cd frontend && npm run build` (static export to `frontend/out/`)
- Stage to Django: `bash scripts/build_to_django.sh`

## Testing Rules
- Never run the full frontend unit or E2E suite.
- Maximum 20 tests per batch and 3 commands per cycle.
- Assert user-visible behavior, not implementation details.
- Use stable locators in E2E (`getByRole` > `getByTestId`).
- ⚠️ **Project is SUSPENDED** — do not run tests against the live deploy environment.

## Tech Debt to Be Aware Of
- `next-intl` is wired but bilingual coverage is incomplete.
- The build → staging step (`build_to_django.sh`) is **manual**; no CI deploy pipeline.
- The custom hook `useScrollAnimation.ts` should be the canonical scroll-trigger helper — do not duplicate scroll logic in individual components.
