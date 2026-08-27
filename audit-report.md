# Vulnerability Audit & Dependency Update Report

**Branch:** `chore/27082026-upgrade-backend-dependencies`
**Date:** 2026-08-27
**Base:** `master` @ `abfa4ac`
**Scope:** 17 Python packages, one dependency per commit, CI green between bumps

## Initial findings

- 17 outdated packages in the deployed Python 3.12 environment.
- 13 unique advisories across `idna`, `pip`, `PyJWT`, `sqlparse`, and `urllib3`.
- Django 6.1 is not deployable yet because it requires MySQL 8.4+; staging uses
  MySQL 8.0.46.
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
| huey | 2.6.0 | 3.3.4 | pending | pending |
| redis | 7.4.0 | 8.1.0 | pending | pending |
| Django | 6.0.8 | 6.0.8 | constrained | MySQL 8.0 compatibility |

## Final verification

Pending completion of all dependency commits.
