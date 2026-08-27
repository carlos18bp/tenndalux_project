# Vulnerability Audit & Dependency Update Report

**Branch:** `chore/27082026-django-6-1`
**Date:** 2026-08-27
**Base:** `master` @ `4241c81`
**Scope:** 17 Python packages, one dependency per commit, CI green between bumps

## Initial findings

- 17 outdated packages in the deployed Python 3.12 environment.
- 13 unique advisories across `idna`, `pip`, `PyJWT`, `sqlparse`, and `urllib3`.
- Django 6.1 was initially blocked because it requires MySQL 8.4+ and staging
  still used MySQL 8.0.46.
- Snapshots: `/tmp/tenndalux_project_staging-pip-outdated.json` and
  `/tmp/tenndalux_project_staging-pip-audit.json`.

## Reproducibility

`backend/constraints.txt` records the complete tested Python resolution.
`backend/requirements.txt` remains the source of direct dependencies and loads
the constraints file with `-c constraints.txt`. `pytz` stays explicit because
django-dbbackup 5 no longer pulls it into an existing fleet environment.

## Progress

| Package | Initial | Target | Status | Verification |
|---|---:|---:|---|---|
| PyJWT | 2.12.1 | 2.13.0 | applied | `pip check`; 3 auth tests passed |
| pip | 26.1.1 | 26.2.1 | applied | isolated install; `pip check` |
| urllib3 | 2.6.3 | 2.7.0 | applied | isolated install; `pip check`; Requests adapter smoke check |
| idna | 3.13 | 3.19 | applied | isolated install; `pip check`; Unicode-domain encoding smoke check |
| sqlparse | 0.5.5 | 0.6.0 | applied | isolated install; `pip check`; Django check; SQL formatting smoke check |
| asgiref | 3.11.1 | 3.12.1 | applied | isolated install; `pip check`; Django check; sync/async bridge smoke check |
| certifi | 2026.4.22 | 2026.7.22 | applied | isolated install; `pip check`; SSL CA-bundle smoke check |
| charset-normalizer | 3.4.7 | 3.5.1 | applied | isolated install; `pip check`; UTF-8 decoding smoke check |
| packaging | 26.2 | 26.3 | applied | isolated install; `pip check`; version-specifier smoke check |
| Pygments | 2.20.0 | 2.21.0 | applied | isolated install; `pip check`; syntax-highlighting smoke check |
| pytz | 2026.2 | 2026.3.post1 | applied | isolated install; `pip check`; DST-offset smoke check |
| wheel | 0.47.0 | 0.48.0 | applied | isolated install; `pip check`; CLI/import version checks |
| django-dbbackup | 4.3.0 | 5.3.0 | applied | isolated install; `pip check`; Django/storage/command checks |
| django-redis | 6.0.0 | 7.0.0 | applied | isolated install; `pip check`; Django/client checks; new transitive dependency pinned |
| huey | 2.6.0 | 3.3.4 | applied | isolated install; `pip check`; Django/config/schedule/task checks |
| redis | 7.4.0 | 8.1.0 | applied | isolated install; `pip check`; django-redis/Huey/client packing checks |
| Django | 6.0.8 | 6.1 | applied | host upgraded to MySQL 8.4.11; mailer migration; isolated install; `pip check`; Django checks and focused tests |

## Final verification

- Clean Python 3.12 install: passed; normalized `pip freeze --all` matches
  `backend/constraints.txt` exactly.
- `pip check`: no broken requirements.
- `pip-audit`: no known vulnerabilities (the initial 13 advisories are clear).
- `pip list --outdated`: no outdated packages remain.
- Django system check: passed; only the expected worktree warning for the
  unbuilt `backend/static/` directory was reported.
- `makemigrations --check --dry-run`: no changes detected.
- Focused backend verification: 7 authentication and lead-notification tests
  passed.
- Django 6.1 mail configuration migrated from deprecated `EMAIL_BACKEND` and
  `fail_silently` APIs to `MAILERS`; targeted tests run with Django 7.0
  deprecations treated as errors.
- MySQL 8.0.46 -> 8.4.11: official preflight found no fatal schema issues;
  12/12 database restore tests and 580/580 post-upgrade object checks passed.
- Every preceding dependency commit completed the full PR CI gate before the
  next dependency was changed; the Django 6.1 follow-up commit must pass the
  same gate before delivery.
