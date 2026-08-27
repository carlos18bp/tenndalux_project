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
- **Resolution**: Added `backend/constraints.txt`, upgraded all 17 packages (including Django 6.1 after the MySQL 8.4.11 prerequisite), and verified the final graph with a clean install, `pip check`, `pip-audit`, focused tests, and per-commit CI gates.
- **Files Affected**: `backend/requirements.txt`, `backend/constraints.txt`, `.github/workflows/ci.yml`, `audit-report.md`

### [ERR-003] Removed MySQL option blocked the first 8.4.11 start
- **Date**: 2026-08-27
- **Context**: Fleet MySQL upgrade from 8.0.46 to 8.4.11, required by Django 6.1.
- **Root Cause**: MySQL Shell's 8.4.10 upgrade checker reported `binlog_transaction_dependency_tracking` as a changed-default variable, but MySQL 8.4.11 rejects it as unknown.
- **Resolution**: Removed the option from the temporary compatibility profile, reran `mysqld --validate-config`, started MySQL successfully, and verified the automatic server upgrade plus all 580 database objects before reopening applications.
- **Files Affected**: `/etc/mysql/mysql.conf.d/zz-mysql84-compat.cnf` (server configuration)
