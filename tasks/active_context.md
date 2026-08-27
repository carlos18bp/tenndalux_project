# Active context

## Current task

Upgrade the 17 Python packages reported as outdated on 2026-08-27. The work is
isolated in one PR, with one dependency per commit and a mandatory green CI run
between dependencies.

## Current step

Django 6.0.8 compatibility constraint and final verification. redis-py 8.1.0
passed an isolated requirements install, `pip check`, Django's system check,
django-redis/Huey client construction, and RESP command packing; all earlier
commits are green in PR CI.

## Guardrails

- Never mutate the deploy clone's venv or production database.
- Resolve and test packages in an isolated temporary Python 3.12 venv.
- Django remains below 6.1 while the server uses MySQL 8.0.46.
- Do not proceed to the next dependency while PR CI is red or pending.
