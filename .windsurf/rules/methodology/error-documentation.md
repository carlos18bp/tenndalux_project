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

#### [KNOWN-001] Project is suspended (2026-03-17)
- **Context**: Services stopped due to non-payment. DB and media preserved.
- **Workaround**: Do not run deploys, migrations, or service restarts. Wait for explicit reactivation from the user.

---

## Resolved Issues

_No resolved issues recorded yet. When fixing a non-trivial bug, document the root cause and resolution here._
