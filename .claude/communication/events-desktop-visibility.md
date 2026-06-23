# Coordination — events-desktop-visibility

Single-page RFEC site. Task: "desktop version must also have the events section."
Branch: `feat/events-module`. Dev server may already be running on port 3001.

## Status board
| Agent | Status | Notes |
| --- | --- | --- |
| tech-leader | done | Diagnosed root cause; wrote plans. |
| frontend-specialist | done | Decision: ALWAYS render section + empty state. Implemented + verified at 375/1280/1440. Lint passes. Not committed. |
| qa-specialist | pending | Verify desktop render + mobile unchanged + lint. |
| context-auditor | pending | Update FEAT-004 / INFRA-004 only if code changed. |

## Diagnosed root cause (tech-leader)
The events section is missing at EVERY viewport, not just desktop. Cause is data, not CSS:
- `components/upcoming-events.tsx` does `if (events.length === 0) return null`.
- Live Sanity `production` dataset (project `3pmoww5f`) has exactly 1 event ("Bits & Chards", endAt 2026-06-10) — in the past vs. today 2026-06-21.
- `UPCOMING_FILTER` (`coalesce(endAt, startAt) >= now()`) → 0 rows → empty array → section removed from DOM.
- Verified: `curl localhost:3001/` HTML has 0 occurrences of `id="events"` / "Próximos Eventos".
- No `hidden`/mobile-only classes anywhere in `upcoming-events.tsx` or `event-card.tsx`. Responsive pattern already correct and consistent with `mission.tsx`.

## Integration contracts / constraints
- Mobile (375px) MUST stay pixel-identical (recent pass = 0% diff). Scope desktop changes behind `md:`/`lg:`.
- Do NOT mutate production Sanity dataset. Only a read token is available.
- To screenshot the section, inject sample/temporary upcoming data locally, then REVERT — committed code must still fetch real Sanity data.
- `npm run lint` must pass. Do NOT commit; leave changes in working tree.

## Open questions (need a decision)
1. ~~Empty-state behavior~~ **RESOLVED (user decision): ALWAYS render the section.** When there are no upcoming events, render heading + intro + a tasteful empty-state block + the "Ver todos os eventos" CTA. The section is now present at all widths regardless of data.

## Log
- tech-leader: investigation complete; plans + this file created.
- frontend-specialist: implemented always-render + empty state in `components/upcoming-events.tsx`. Removed `if (events.length === 0) return null`. Added a dark-themed empty-state card (`border-white/10 bg-white/5`, `CalendarX` icon, `text-zinc-400`, `max-w-md` centered) shown when no events; grid+cards unchanged when events exist; CTA always shown. Copy: "Nenhum evento agendado no momento" / "Fique de olho! Em breve teremos novos encontros da comunidade." Verified empty state at 375/1280/1440 and populated grid (via temporary stub, reverted) at 375/1280. Committed source still fetches real Sanity via `getUpcomingEvents()` (no hardcoded events). `npm run lint` clean. Not committed — left in working tree.
