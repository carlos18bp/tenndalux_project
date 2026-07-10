---
trigger: model_decision
description: Error documentation and known issues tracking. Reference when debugging, fixing bugs, or encountering recurring issues.
---

# Error Documentation — Tenndalux

This file tracks known errors, their context, and resolutions. When a reusable fix or correction is found during development, document it here to avoid repeating the same mistake.

---

## Format

```
#### [ERR-NNN] Short description
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

#### [KNOWN-001] Project suspension (RESOLVED 2026-05-07)
- **Date**: 2026-03-17 → 2026-05-07
- **Context**: Services stopped 2026-03-17 due to non-payment. DB and media were preserved throughout.
- **Resolution**: Payment resolved 2026-04-22; project reactivated 2026-05-07 as `tenndalux_project_staging` on `vps-projectapp-staging`.

_When fixing a non-trivial bug, document the root cause and resolution here._
