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
