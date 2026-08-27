# Active context

## Current task

Upgrade the 17 Python packages reported as outdated on 2026-08-27. The work is
isolated in one PR, with one dependency per commit and a mandatory green CI run
between dependencies.

## Current step

Implementation complete. Sixteen packages were upgraded and Django 6.0.8 was
retained as the highest MySQL 8.0-compatible release. A clean Python 3.12
install matched `constraints.txt`, `pip check` and `pip-audit` passed, no model
changes were detected, and 7 focused backend tests passed. The final action is
to push this Django constraint commit and require green PR CI; do not merge or
deploy from this session.

## Guardrails

- Never mutate the deploy clone's venv or production database.
- Resolve and test packages in an isolated temporary Python 3.12 venv.
- Django remains below 6.1 while the server uses MySQL 8.0.46.
- Do not proceed to the next dependency while PR CI is red or pending.
