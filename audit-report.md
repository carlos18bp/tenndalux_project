# Vulnerability Audit & Dependency Update Report

**Branch:** `chore/27082026-vuln-audit`
**Date:** 2026-08-27
**Base:** `master` @ `b6eda93`
**Scope:** patch + minor updates only (no major version bumps)

## Summary

| Surface  | Vulns (initial) | Vulns (final) | Outdated (initial) |
|----------|-----------------|---------------|--------------------|
| Frontend | 6 high (prod deps): axios, form-data, nanoid, next, postcss, sharp | **0** | 13 |
| Backend  | 0 (never measured before — `pip-audit` was not installed) | **0** | 26 |

---

## Frontend — `npm audit --omit=dev` (initial)

| Package | Severity | Notes |
|---|---|---|
| axios | high | 10 advisories: recursion DoS in `formDataToJSON`, prototype pollution, `maxBodyLength` bypass, `NO_PROXY` bypass |
| form-data | high | GHSA-hmw2-7cc7-3qxx — CRLF injection via unescaped multipart field names |
| nanoid | high | GHSA-28wg-ghj8-5hjv, GHSA-2v37-7h3g-55p8 — infinite loop on negative/zero size |
| next | high | 9 advisories: middleware/proxy bypass, SSRF in Server Actions and rewrites, cache confusion, image-optimization DoS |
| postcss | high | XSS via unescaped `</style>`, path traversal via `sourceMappingURL` (transitive of `next`) |
| sharp | high | GHSA-f88m-g3jw-g9cj — inherited libvips CVEs (transitive of `next`) |

**Totals:** 0 critical / 6 high / 0 moderate / 0 low.

## Frontend — `npm outdated` (initial)

- next: 16.2.6 → 16.3.3 · eslint-config-next: 16.2.6 → 16.3.3
- axios: 1.16.1 → 1.20.0 · framer-motion: 12.38.0 → 12.43.0 · next-intl: 4.12.0 → 4.13.7
- swiper: 12.1.4 → 12.2.0 · @playwright/test: 1.60.0 → 1.62.1
- react / react-dom: 19.2.6 → 19.2.8 · zustand: 5.0.13 → 5.0.15 · js-cookie: 3.0.7 → 3.0.8
- @testing-library/user-event: 14.6.1 → 14.6.6

---

## Backend — `pip-audit` (post-update, first ever run on this project)

`pip-audit` was never installed in the deploy venv, so no CVE data existed for Python
until now. Run against a **throwaway venv** built from the updated `requirements.txt`:

| Package | Version | Vulns | Note |
|---|---|---|---|
| pip | 24.0 | 7 (PYSEC-2026-196/1795/1796/2875/2876/3721) | `pip` itself, shipped with the fresh venv — **not** a project dependency |

**Project dependencies: 0 known vulnerabilities.**

> The deploy venv runs `pip 26.1.1`, which is still short of PYSEC-2026-196 (fix 26.1.2)
> and PYSEC-2026-3721 (fix 26.2). Upgrading the tooling `pip` is an operator action on
> the venv, not a change to this repo.

## Backend — `pip list --outdated` (initial)

26 packages behind. Applicable within the current major: `asgiref`, `certifi`,
`charset-normalizer`, `coverage`, `Django`, `django-silk`, `djangorestframework`,
`Faker`, `gunicorn`, `idna`, `packaging`, `pillow`, `Pygments`, `PyJWT`, `pytest`,
`pytest-django`, `pytz`, `requests`, `sqlparse`, `urllib3`, `wheel`.

---

## Plan

### Frontend
- `npm audit fix` (never `--force`) for the transitive fixes, then
  `npm-check-updates -u --target minor` + `npm install`.
- `next` is pinned exactly (`16.2.6`), which is why `npm audit` demanded `--force`.
  `16.2 → 16.3` is a **minor inside major 16**, so it lands through `ncu --target minor`
  instead — no `--force` anywhere in this run.

### Backend
- Raise the floors of `requirements.txt` (the file uses ranges, not exact pins), keeping
  every existing ceiling.
- Add the two missing ceilings (`django-redis`, `redis`) — see `Updates Applied`.

---

## Updates Applied

### Frontend (commit `deps(frontend): apply patch+minor updates`)
- next 16.2.6 → 16.3.3, eslint-config-next 16.2.6 → 16.3.3 (drags postcss + sharp)
- axios ^1.16.1 → ^1.20.0 · framer-motion ^12.38.0 → ^12.43.0 · next-intl ^4.12.0 → ^4.13.7
- swiper ^12.1.4 → ^12.2.0 · @playwright/test ^1.60.0 → ^1.62.1
- react / react-dom 19.2.6 → 19.2.8 · zustand ^5.0.13 → ^5.0.15 · js-cookie ^3.0.7 → ^3.0.8
- @testing-library/user-event ^14.6.1 → ^14.6.6
- form-data and nanoid resolved transitively by `npm audit fix`
- Final `npm audit --omit=dev`: **0 vulnerabilities** (was 0 critical / 6 high).

### Backend (commit `deps(backend): apply patch+minor updates`)
- `Django>=6.0,<7.0` → `Django>=6.0.5,<6.1` — floor raised **and capped**, see `Rollbacks`
- `djangorestframework>=3.14.0` → `>=3.18.0` · `Pillow>=10.0.0` → `>=12.3.0`
- `requests>=2.31.0` → `>=2.34.2` · `gunicorn>=21.2.0` → `>=26.2.0`
- `Faker>=20.0.0` → `>=40.37.0` · `pytest>=8.0.0` → `>=9.1.1` · `pytest-django>=4.8.0` → `>=4.14.0`
- `coverage>=7.0.0` → `>=7.15.4` · `django-silk` → `>=5.5.2,<6.0` · `django-dbbackup` → `>=4.3.0,<5.0`
- `huey` → `>=2.6.0,<3.0` (ceiling untouched)

Resolved versions in the verification venv: Django 6.0.8, DRF 3.18.0, Pillow 12.3.0,
requests 2.34.2, gunicorn 26.2.0, redis 7.4.1, django-redis 6.0.0, huey 2.6.0.

### Backend ceilings (commit `chore(backend): pin django-redis and redis below next major`)
- `django-redis>=5.4.0` → `django-redis>=6.0,<7.0`
- `redis>=5.0.0` → `redis>=7.4,<8.0`

Both were the only cache/queue dependencies without a `<major` ceiling, while `huey`,
`django-dbbackup` and `django-silk` had one. A freshly built venv would have installed
django-redis 7 and redis 8 — a major jump nobody decided. The new ceilings freeze what
staging runs today.

### Majors deliberately skipped
| Package | Current → Latest | Why |
|---|---|---|
| huey | 2.6.0 → 3.3.4 | ceiling `<3.0` already in place |
| django-dbbackup | 4.3.0 → 5.3.0 | ceiling `<5.0` already in place |
| django-redis | 6.0.0 → 7.0.0 | major; ceiling added in this PR |
| redis | 7.4.1 → 8.1.0 | major; ceiling added in this PR |
| sqlparse | 0.5.5 → 0.6.0 | `0.x → 0.y` counts as a major |
| Django | 6.0.8 → 6.1 | **blocked by the server's MySQL version** — see `Rollbacks` |

## Rollbacks

1. **Django 6.1 → capped at `<6.1`.** The first attempt raised the floor to
   `Django>=6.1,<7.0`. `manage.py check` in the verification venv failed with:
   `django.db.utils.NotSupportedError: MySQL 8.4 or later is required (found 8.0.46)`.
   Django 6.1 drops support for MySQL 8.0, and `vps-projectapp-staging` runs 8.0.46, so
   the bump would have taken the site down on the next deploy. The requirement is now
   `Django>=6.0.5,<6.1` with the reason recorded inline. Lifting the cap requires
   upgrading MySQL on the server first.

2. **@testing-library/jest-dom 6.10.0 → back to ^6.9.1.** npm flags 6.10.0 as an
   *"Incorrect minor release with breaking changes (Node >=22 and required
   @testing-library/dom peer). Use 6.9.1 for the 6.x line."* Reverted to `^6.9.1`.

No `npm audit fix --force` and no major bump was applied anywhere.

## Verification Results

### Frontend
- `npm audit --omit=dev`: **0 vulnerabilities** (from 0 critical / 6 high).
- `npm run build`: success — 13 routes generated, static export intact.
- `npx tsc --noEmit`: clean (exit 0).
- `npm run lint`: 21 errors / 6 warnings. The **same 21 errors exist on `master`** with
  the pre-bump dependencies (verified by linting the deploy checkout) — pre-existing
  debt, not a regression. Lint is not gated by CI.
- `npm test` slice (`app/__tests__/homePage.test.tsx`, `components/content/__tests__/BlockRenderer.test.tsx`):
  2 suites, 7 tests passed.

### Backend
Verified in a **throwaway venv**, never in the deploy venv, so the live staging service
was not upgraded out of band (the real install happens in `/deploy-and-check` Phase 2,
followed by a service restart).

- `manage.py check`: 0 errors — 1 warning (`staticfiles.W004`: `backend/static` absent in
  the worktree, since it is a gitignored build artifact).
- `pytest --collect-only -q`: 61 tests collected, no collection errors.
- Slice `core_app/tests/serializers/test_content_blocks.py`: **12 passed**, run against
  SQLite (`DJANGO_DB_ENGINE` overridden) so the production MySQL server was never touched.
- Full suite runs in CI against its own MySQL service.
