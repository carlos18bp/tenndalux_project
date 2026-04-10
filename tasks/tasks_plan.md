# Tasks Plan — Tenndalux

## Project Status
**SUSPENDED since 2026-03-17** — no active development. Awaiting payment resolution and explicit reactivation.

---

## Backlog

### Infrastructure
- [ ] Create `scripts/build_to_django.sh` — automate copying `frontend/out/` HTML to `backend/templates/frontend/` and `_next/` to `backend/static/`
- [ ] Add Playwright mobile + tablet profiles to `playwright.config.ts`
- [ ] Set up CI deploy pipeline (currently manual)

### Backend
- [ ] Complete `GalleryField` serializer integration — expose gallery image URLs uniformly across `Project`, `Service`, `Post`, `HomePage`, `AboutPage` serializers
- [ ] Add bilingual (`*_en`/`*_es`) fields to remaining models that need them

### Frontend
- [ ] Complete `next-intl` migration — activate `useTranslations()` in all components that still hardcode Spanish strings
- [ ] Add mobile/tablet Playwright E2E profiles and corresponding test coverage

### Documentation
- [ ] Write `docs/USER_FLOW_MAP.md` — register all user flows
- [ ] Write `frontend/e2e/flow-definitions.json` — register E2E flow tags

---

## Completed

- [x] Bootstrap Memory Bank (`docs/methodology/` + `tasks/`) — 2026-04-10
- [x] Fix AI tools ecosystem — replace KoreProject contamination, fix view pattern docs, fix build destination docs — 2026-04-10
- [x] Update `CLAUDE.md` with required prefix and missing invariants — 2026-04-10
