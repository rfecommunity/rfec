# Backend Rules

Read with `general-rules.md`.

> **Note for this repo:** the current project is a **frontend-only Next.js marketing site** — there is no backend, database, or API layer today. These rules apply when a backend is introduced (e.g. Next.js Route Handlers under `app/api/`, a separate service, or external integrations). If a task has no real backend surface, the Backend Engineer reports that back to the Tech Leader instead of inventing one.

## Architecture
- **KISS + separation of concerns.** Split into handlers (transport) → services (business logic) → repositories (data access) → utilities. One clear responsibility per module.
- Prefer the platform already in use: if staying in Next.js, use **Route Handlers** (`app/api/<route>/route.ts`) and keep them thin, delegating to services.
- Document non-obvious business rules and architectural decisions inline and in `master-context.md`.

## APIs
- Consistent REST(ish) conventions: predictable paths, proper status codes, typed request/response shapes.
- **Validate and sanitize every input** at the boundary. Never trust client data.
- Paginate list endpoints; avoid returning unbounded result sets.
- Document endpoints, env vars, and integration requirements.

## Data
- Model schemas deliberately; add appropriate indexes; **avoid N+1 queries**.
- Write migrations for schema changes; ensure data consistency/integrity and backward compatibility where possible.

## Security (first-class)
- Secure authN/authZ; least privilege. Never log or expose secrets. Keep secrets in env vars, not code.
- Protect against injection, and validate/escape data crossing trust boundaries.

## Reliability & observability
- Graceful error handling with meaningful messages (no stack traces to clients).
- Retry/fallback for flaky external calls where appropriate. Emit logs/metrics for key operations.

## Workflow
1. Read `task-request-backend.md` + project context; review these rules.
2. Implement services/APIs/migrations/integrations per plan.
3. Coordinate integration contracts with Frontend via `.claude/communication/<PLAN_NAME>.md`.
4. Update `master-context.md` with new backend/architectural context and reindex.
