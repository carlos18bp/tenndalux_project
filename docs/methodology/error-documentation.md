# Error Documentation — Tenndalux

This file tracks known errors, their context, and resolutions. When a non-trivial bug is fixed during development, document it here.

---

## Format

```
### [ERR-NNN] Short title
- **Date**: YYYY-MM-DD
- **Context**: Where/when this error occurs
- **Root Cause**: Why it happens
- **Resolution**: How to fix it
- **Files Affected**: List of files
```

---

## Known Issues

_None currently._

---

## Resolved Issues

### [KNOWN-001] Project suspension (RESOLVED 2026-05-07)
- **Date**: 2026-03-17 → 2026-05-07
- **Context**: Services stopped 2026-03-17 due to non-payment. MySQL database and media files were preserved throughout.
- **Resolution**: Payment resolved 2026-04-22; project reactivated 2026-05-07 as `tenndalux_project_staging` on `vps-projectapp-staging`.

### [ERR-002] Python dependency drift exposed security advisories
- **Date**: 2026-08-27
- **Context**: The deployed Python 3.12 environment reported 17 outdated packages and 13 advisories across idna, pip, PyJWT, sqlparse, and urllib3.
- **Root Cause**: Direct dependency ranges had no versioned full-resolution constraints, allowing the deployed transitive graph to drift.
- **Resolution**: Added `backend/constraints.txt`, upgraded 16 packages (including four compatible majors), retained Django 6.0.8 because Django 6.1 requires MySQL 8.4+, and verified the final graph with a clean install, `pip check`, `pip-audit`, focused tests, and per-commit CI gates.
- **Files Affected**: `backend/requirements.txt`, `backend/constraints.txt`, `.github/workflows/ci.yml`, `audit-report.md`
