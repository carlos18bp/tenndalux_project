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

### [KNOWN-001] Project is suspended (2026-03-17)
- **Context**: Services stopped due to non-payment. MySQL database and media files preserved.
- **Workaround**: Do not run deploys, migrations, or service restarts. Wait for explicit reactivation from the user.

---

## Resolved Issues

_No resolved issues recorded yet._
