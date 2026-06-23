# Tech Leader Manager — Long-Term Memory

> Durable knowledge that stays useful across many tasks: stable file locations, recurring patterns, architectural decisions, conventions learned. Append newest-first. Keep entries terse.

## 2026-06-21 — "missing on desktop" was actually empty data
- Report: "events section missing on desktop." Real cause: NO responsive bug. `components/upcoming-events.tsx` does `if (events.length === 0) return null`. Sanity `production` (project 3pmoww5f) had only past events vs. current date, so `getUpcomingEvents()` (filter `coalesce(endAt,startAt) >= now()`) returned []. Section absent at ALL widths.
- Lesson: for "section X missing" reports on data-driven sections, FIRST `curl localhost:<port>/` and grep for the section id, and query Sanity directly (apicdn.sanity.io/v<ver>/data/query/<dataset>?query=...) before assuming CSS. Users often test only desktop and generalize.
- `sanity/lib/fetch.ts` degrades gracefully: returns null (→ []) when unconfigured or fetch fails. So empty != misconfigured.
- `.env` is populated locally (real project id + read token). Only a READ token — never mutate the production dataset for verification; inject temp data locally and revert.
- Dev server: port 3000 often busy → Next falls back to 3001. Check /tmp dev log for actual port.

## Stable locations
- Homepage composition: `app/(site)/page.tsx` (note route group `(site)`), stacks sections; events slotted between Mission and Join.
- Events UI: `components/upcoming-events.tsx` + `components/events/*` + `components/title-with-tag.tsx`.
- Sanity: `sanity/lib/{queries,fetch,client,token,image}.ts`. Contexts: FEAT-004 (events), INFRA-004 (sanity).
- Responsive convention: sections use `container mx-auto`, `px-5 py-20 lg:py-28`, grids scale `sm:`/`lg:`. Mobile is the approved baseline (375px, 0% diff) — gate desktop changes behind `md:`/`lg:`.
