---
description: Rules to parse solution architecture from project documentation.
trigger: model_decision
---

# Architecture Understanding

READ_ARCHITECTURE: |
  File: AGENTS.md (root) — section "Lessons Learned — Tenndalux"
  Also read: backend/AGENTS.md, frontend/AGENTS.md
  Required parsing:
  1. Load and parse the Mermaid directory diagram in root AGENTS.md
  2. Extract and understand:
     - Module boundaries and relationships (core_app domains: portfolio, blog, services, leads, site, user)
     - Data flow patterns (FBV @api_view → serializer → model)
     - System interfaces (JWT-only /api/, session-only /admin/)
     - Component dependencies (django_attachments, easy_thumbnails, Huey, SimpleJWT)
  3. Validate any changes against architectural constraints
  4. Ensure new code maintains defined separation of concerns

  Error handling:
  1. If AGENTS.md not found: STOP and notify user
  2. If diagram parse fails: REQUEST clarification
  3. If architectural violation detected (e.g., CBV introduced, raw axios called): WARN user

  Note: There is no docs/methodology/architecture.md — the canonical architecture
  reference is the "Lessons Learned — Tenndalux" section of the root AGENTS.md.
