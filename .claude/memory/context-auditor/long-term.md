# Context Auditor — Long-Term Memory

> Durable knowledge that stays useful across many tasks: stable file locations, recurring patterns, architectural decisions, conventions learned. Append newest-first. Keep entries terse.

## 2026-06-07 — Events Module audit

### Stable conventions observed
- The CLI `validate` checks: `# Context: <name>` title, all 5 header fields (`ID`, `Category`, `Last Updated`, `Dependencies`, `Description`), 5 required sections, JSON ai-meta block, ID format, category=dir match, ai-meta consistency, description ≤ 100 chars.
- Description ≤ 100 chars is a **warn**, not an error, in the current CLI code; still keep it under.
- The `check` command treats orphans (contexts not depended on by anyone) as warnings only, not errors. New terminal-leaf contexts (FEAT-004, UTIL-003) are expected to appear as orphans in the `check` output unless they are depended on by other contexts — they were not flagged because INFRA-004 depends on them and FEAT-004 depends on UTIL-003.
- Category directory name in `rel.split('/')[0]` must exactly match the `Category` header: `core`, `features`, `infrastructure`, `utilities`.

### Recurring drift patterns to watch
- When a new route group (`(site)`) is introduced, CORE-001 and FEAT-002 both need updating: layout responsibilities shift.
- When new npm deps are added for a feature, INFRA-001 needs a dep table update.
- Navigation components (Header, Footer) tend to accrue new links when new pages land; FEAT-002 lags behind.

### GROQ / Sanity architecture notes (for future agents)
- `sanityFetch` wraps all data access; never call `client.fetch` directly in pages/components.
- `EVENTS_TAG` = broad revalidation; `eventTag(slug)` = narrow per-event. Both are called in the webhook handler with `'max'` as the cache-life profile (Next 16 requirement).
- `isSanityConfigured` guards the client; the whole data layer returns null/empty when env vars are missing — no env vars = no crash.
- `now()` in GROQ is intentional (server-evaluated, stable cache key); do not replace with a `$now` param.
