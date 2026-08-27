# Backend dependency upgrade plan

Branch: `chore/27082026-upgrade-backend-dependencies`

The 2026-08-27 audit found 17 outdated packages. Each item is delivered in its
own commit and must have a green PR CI run before the next item starts.

- [x] PyJWT 2.12.1 -> 2.13.0
- [x] pip 26.1.1 -> 26.2.1
- [x] urllib3 2.6.3 -> 2.7.0
- [x] idna 3.13 -> 3.19
- [x] sqlparse 0.5.5 -> 0.6.0
- [x] asgiref 3.11.1 -> 3.12.1
- [x] certifi 2026.4.22 -> 2026.7.22
- [x] charset-normalizer 3.4.7 -> 3.5.1
- [x] packaging 26.2 -> 26.3
- [x] Pygments 2.20.0 -> 2.21.0
- [x] pytz 2026.2 -> 2026.3.post1
- [x] wheel 0.47.0 -> 0.48.0
- [x] django-dbbackup 4.3.0 -> 5.3.0
- [x] django-redis 6.0.0 -> 7.0.0
- [ ] huey 2.6.0 -> 3.3.4
- [ ] redis 7.4.0 -> 8.1.0
- [ ] Django 6.0.8 -> highest MySQL 8.0-compatible release

Final gate: clean isolated install, `pip check`, `pip-audit`, focused backend
tests, PR CI green, and no merge from this session.
