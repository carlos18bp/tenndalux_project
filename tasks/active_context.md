# Active Context — Tenndalux

## Current Status
**Project is SUSPENDED since 2026-03-17** — no active feature development.

Last activity: 2026-04-10 — AI tools ecosystem audit and Memory Bank bootstrap.

---

## Recent Work (2026-04-10)

### AI Tools Ecosystem Audit
Completed a full audit of all AI guidance files. Key findings and fixes:

1. **KoreProject contamination removed** — `.windsurf/rules/methodology/lessons-learned.md` and `error-documentation.md` contained content from an unrelated project (KoreProject). Replaced with Tenndalux-specific content.

2. **View pattern corrected everywhere** — All guidance files incorrectly stated "100% FBV @api_view". Actual pattern is mixed:
   - Auth: FBV `@api_view`
   - Content (portfolio, blog, services, leads): `ModelViewSet` + `DefaultRouter`
   - Singletons (site settings/pages): `generics.RetrieveUpdateAPIView`
   - Frontend catch-all: plain Django FBV

3. **Frontend build destination corrected** — All files incorrectly said HTML goes to `backend/static/`. Actual: HTML → `backend/templates/frontend/`, assets → `backend/static/`. `build_to_django.sh` script doesn't exist yet.

4. **Windsurf workflow fixed** — 3 wrong values in `.windsurf/workflows/deploy-and-check.md`: settings module, frontend path, nginx config path.

5. **Memory Bank bootstrapped** — Created `docs/methodology/` and `tasks/` for the first time.

### Files Modified
- `CLAUDE.md` — prefix + new invariants + corrected view/build descriptions
- `AGENTS.md` — mermaid chart + lessons learned: view pattern + build path + Memory Bank pointer
- `backend/AGENTS.md` — view pattern override corrected
- `backend/CLAUDE.md` — view pattern corrected
- `frontend/AGENTS.md` — build destination corrected (2 places)
- `frontend/CLAUDE.md` — build destination corrected
- `.windsurf/rules/methodology/lessons-learned.md` — full replacement + post-replacement fixes
- `.windsurf/rules/methodology/error-documentation.md` — full replacement
- `.windsurf/rules/methodology/architecture-understanding.md` — file pointer updated
- `.windsurf/workflows/deploy-and-check.md` — 3 values fixed

---

## Next Session Starting Point

No active tasks. If the project is reactivated:
1. Confirm payment status with user
2. Check service status: `sudo systemctl status tenndalux_gunicorn tenndalux-huey`
3. Run health check: `curl http://localhost:8000/api/health/`
4. Review `tasks/tasks_plan.md` backlog for prioritization

If continuing AI tools / documentation work:
- Outstanding: `docs/USER_FLOW_MAP.md` and `frontend/e2e/flow-definitions.json` need to be created
- Outstanding: `build_to_django.sh` deployment script needs to be written
