# Vulnerability Audit & Dependency Update Report

**Branch:** chore/17052026-dep-vuln-audit
**Date:** 2026-05-17
**Base:** master @ be86890
**Scope:** patch + minor updates only (no major version bumps)

## Summary

| Surface  | Vulns (initial) | Vulns (final) | Outdated (initial) | Updates applied |
|----------|-----------------|---------------|--------------------|-----------------|
| Frontend | 16 (1 critical, 5 high, 5 moderate, 5 low) | 7 (0 critical, 0 high, 3 moderate, 4 low) | 14 packages | 16 packages |
| Backend  | 0               | 0             | 2 packages         | 0 (blocked by major pins) |

---

## Frontend — `npm audit` (initial)
Source: `/tmp/tenndalux_project_staging-npm-audit.json`

| Package | Severity | Notes |
|---------|----------|-------|
| `swiper` 12.1.1 | **critical** | 1 critical vulnerability |
| `axios` 1.13.4 | high | SSRF via NO_PROXY bypass, prototype pollution, header injection, response tampering |
| `next` 16.1.6 | high | Multiple CVEs: middleware/proxy bypasses, DoS, XSS via beforeInteractive, cache poisoning |
| `flatted` (transitive) | high | 1 high |
| `minimatch` (transitive) | high | 1 high |
| `picomatch` (transitive) | high | 1 high |
| `ajv` (transitive) | moderate | ReDoS with `$data` option |
| `brace-expansion` (transitive) | moderate | 1 moderate |
| `follow-redirects` (transitive via axios) | moderate | 1 moderate |
| `next-intl` 4.8.2 | moderate | via next |
| `postcss` (transitive) | moderate | XSS via unescaped `</style>` |
| `@tootallnate/once` (transitive) | low | Control flow scoping issue |
| `http-proxy-agent` (transitive) | low | 1 low |
| `icu-minify` (transitive) | low | 1 low |
| `jest-environment-jsdom` (transitive) | low | 1 low |
| `jsdom` (transitive) | low | 1 low |

**Totals:** 1 critical / 5 high / 5 moderate / 5 low = **16 total**

## Frontend — `npm outdated` (initial)

| Package | Current | Wanted | Latest | Action |
|---------|---------|--------|--------|--------|
| `axios` | 1.13.4 | 1.16.1 | 1.16.1 | Updated |
| `framer-motion` | 12.34.1 | 12.38.0 | 12.38.0 | Updated |
| `gsap` | 3.14.2 | 3.15.0 | 3.15.0 | Updated |
| `js-cookie` | 3.0.5 | 3.0.7 | 3.0.7 | Updated |
| `lucide-react` | 0.574.0 | 0.574.0 | 1.16.0 | Partial (0.577.0, major 1.x skipped) |
| `next` | 16.1.6 | 16.1.6 | 16.2.6 | Updated (exact pin overridden via ncu) |
| `next-intl` | 4.8.2 | 4.12.0 | 4.12.0 | Updated |
| `react` | 19.2.3 | 19.2.3 | 19.2.6 | Updated |
| `react-dom` | 19.2.3 | 19.2.3 | 19.2.6 | Updated |
| `swiper` | 12.1.1 | 12.1.4 | 12.1.4 | Updated |
| `zustand` | 5.0.11 | 5.0.13 | 5.0.13 | Updated |
| `@playwright/test` | 1.42.0 | 1.60.0 | 1.60.0 | Updated |
| `@testing-library/jest-dom` | 6.4.2 | 6.9.1 | 6.9.1 | Updated |
| `@testing-library/user-event` | 14.5.2 | 14.6.1 | 14.6.1 | Updated |
| `@types/jest` | 29.5.12 | 29.5.14 | 29.5.14 | Updated |
| `eslint-config-next` | 16.1.6 | 16.2.6 | 16.2.6 | Updated (synced with next) |

---

## Backend — `pip-audit` (initial)
Source: `/tmp/tenndalux_project_staging-pip-audit.json`

**No vulnerabilities found.** 56 packages scanned.

## Backend — `pip list --outdated` (initial)
Source: `/tmp/tenndalux_project_staging-pip-outdated.json`

| Package | Installed | Latest | Action |
|---------|-----------|--------|--------|
| `django-dbbackup` | 4.3.0 | 5.3.0 | **Skipped** — pin `<5.0` in requirements.txt; 4.3.0 is latest 4.x |
| `huey` | 2.6.0 | 3.0.1 | **Skipped** — pin `<3.0` in requirements.txt; 2.6.0 is latest 2.x |

---

## Plan

### Frontend
- `npm audit fix` to resolve directly auto-fixable vulns
- `npm-check-updates --target minor` to bump exact-pinned packages (notably `next` 16.1.6 → 16.2.6) and all other patch/minor updates
- `npm install` to apply

### Backend
- No updates applicable: both outdated packages are already at their latest version within their ceiling pins (`<5.0` and `<3.0`)
- No requirements.txt changes → no commit

---

## Updates Applied

### Frontend (commit `deps(frontend): apply patch+minor updates`)

| Package | Before | After |
|---------|--------|-------|
| `next` | 16.1.6 | 16.2.6 |
| `eslint-config-next` | 16.1.6 | 16.2.6 |
| `axios` | ^1.13.4 | ^1.16.1 |
| `swiper` | ^12.1.1 | ^12.1.4 |
| `next-intl` | ^4.8.2 | ^4.12.0 |
| `framer-motion` | ^12.34.1 | ^12.38.0 |
| `react` | 19.2.3 | 19.2.6 |
| `react-dom` | 19.2.3 | 19.2.6 |
| `gsap` | ^3.14.2 | ^3.15.0 |
| `js-cookie` | ^3.0.5 | ^3.0.7 |
| `zustand` | ^5.0.11 | ^5.0.13 |
| `lucide-react` | ^0.574.0 | ^0.577.0 |
| `@playwright/test` | ^1.42.0 | ^1.60.0 |
| `@testing-library/jest-dom` | ^6.4.2 | ^6.9.1 |
| `@testing-library/user-event` | ^14.5.2 | ^14.6.1 |
| `@types/jest` | ^29.5.12 | ^29.5.14 |

**Final `npm audit`:** 7 vulnerabilities (0 critical / 0 high / 3 moderate / 4 low)

Remaining outdated (major bumps intentionally skipped):
- `lucide-react` 0.577.0 → 1.16.0 (major: 0.x → 1.x)

### Backend
No updates applied — both outdated packages require major version bumps blocked by existing ceiling pins.

---

## Rollbacks

Ninguno. `npm audit fix` falló inicialmente con exit 1 porque `next` estaba fijado con pin exacto (`"next": "16.1.6"`) bloqueando el auto-fix. Resuelto con `npm-check-updates --target minor` que actualiza el `package.json` directamente.
Los errores ENOTEMPTY durante npm install fueron causados por dos procesos npm concurrentes; resueltos con limpieza de `node_modules` y reinstalación limpia.

---

## Verification Results

### Frontend
- `npm audit`: 7 vulnerabilities (0 critical / 0 high / 3 moderate / 4 low)
- `npm run build` (Next.js 16.2.6 Turbopack): **success** — 13 static pages generated, TypeScript clean

### Backend
- `python manage.py check`: 1 warning (staticfiles.W004 — directorio `static/` no existe, esperado en dev sin build frontend), 0 errors
- `pytest --collect-only -q`: 25 tests collected, no import errors
- Slice `pytest core_app/tests/models/test_models.py -v`: **2 passed** in 4.52s
- `pip-audit`: 0 vulnerabilities across 56 packages
