# Active context

## Current task

Upgrade the 17 Python packages reported as outdated on 2026-08-27. The work is
isolated in one PR, with one dependency per commit and a mandatory green CI run
between dependencies.

## Current step

huey 2.6.0 -> 3.3.4. django-redis 7.0.0 passed an isolated requirements
install, `pip check`, Django's system check, and Redis client construction;
its new `typing_extensions` dependency is pinned, and all earlier commits are
green in PR CI.

## Guardrails

- Never mutate the deploy clone's venv or production database.
- Resolve and test packages in an isolated temporary Python 3.12 venv.
- Django remains below 6.1 while the server uses MySQL 8.0.46.
- Do not proceed to the next dependency while PR CI is red or pending.
