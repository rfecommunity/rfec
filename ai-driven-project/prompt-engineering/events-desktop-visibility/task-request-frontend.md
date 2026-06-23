# Plan — Events section visible on desktop (root cause: empty upcoming data)

**Owner:** frontend-specialist
**Plan folder:** `ai-driven-project/prompt-engineering/events-desktop-visibility/`
**Communication file (read + update):** `.claude/communication/events-desktop-visibility.md`

## Goal
Ensure the "Próximos Eventos" section reliably appears and is styled correctly on desktop, without regressing the already-approved mobile layout.

## Why / Root cause (already diagnosed by tech-leader — do not re-litigate)
The user reported "desktop version must also have the events section." Investigation shows the section is actually missing at **every** viewport, not just desktop:

- `components/upcoming-events.tsx` calls `getUpcomingEvents()` and does `if (events.length === 0) return null`.
- The live Sanity `production` dataset (project `3pmoww5f`) contains **exactly 1 event** ("Bits & Chards", endAt `2026-06-10`), which is in the **past** relative to today (`2026-06-21`).
- The `UPCOMING_FILTER` = `coalesce(endAt, startAt) >= now()` returns 0 rows → empty array → early `return null` → no `<section id="events">` in the DOM.
- Confirmed: `curl localhost:<dev-port>/` returns HTML with zero occurrences of `id="events"` / `Próximos Eventos`.

There is **no responsive/visibility bug**: neither `upcoming-events.tsx` nor `components/events/event-card.tsx` has `hidden`/mobile-only classes. The section already uses the standard responsive pattern (`container mx-auto`, `grid sm:grid-cols-2 lg:grid-cols-3`, `lg:py-28`) consistent with `mission.tsx`. So once upcoming data exists, the section renders on desktop as designed.

## Scope of work
This is primarily a **verification + graceful-handling** task, not a styling overhaul.

1. **Verify the desktop layout renders correctly with data present.** Because the production dataset has no upcoming events, you must render the section with sample/seed data to screenshot it. Do this **without mutating the production Sanity dataset and without faking a real fetch in committed code**. Acceptable approaches (pick the simplest, then revert any temporary changes before finishing):
   - Temporarily relax the date filter locally (e.g. swap `UPCOMING_FILTER` to also include the existing past event) purely to capture screenshots, then revert; OR
   - Render with a local mock array injected only for the screenshot pass, then revert.
   The committed code must keep fetching real data from Sanity.

2. **Decide on graceful empty-state handling (product decision — flag in the communication file, do not guess silently).** Today an empty upcoming list hides the whole section. Options:
   - **Keep current behavior** (`return null` when empty) — minimal, but the section legitimately disappears between events. Recommended default unless the team wants otherwise.
   - **Render the section heading + intro + "Ver todos os eventos" CTA even when empty**, so there is always something on the page. Only implement this if the team confirms it is desired; otherwise leave as-is.
   Do NOT invent backend/seed infrastructure that does not exist.

3. **Any desktop-only styling fixes you find** must be scoped behind `md:`/`lg:` so mobile stays byte-identical. Mobile (375px) was verified at 0% diff in the recent pass and must remain pixel-identical.

## Hard constraints
- Mobile layout must stay pixel-identical at 375px. Scope all desktop-affecting changes behind `md:`/`lg:`.
- Follow `CLAUDE.md`: use `cn()` for class composition; Tailwind v4 lives in `app/globals.css` (no `tailwind.config`); never hand-order imports (ESLint `--fix` does it).
- `npm run lint` must pass.
- Do NOT commit. Leave changes in the working tree.
- Do NOT mutate the production Sanity dataset.

## Acceptance criteria
- [ ] Root cause confirmed and documented in the communication file (empty upcoming data, not a CSS bug).
- [ ] Screenshots of the events section at 1280 / 1440 / 1920 px showing it rendering correctly **with data present** (via a reverted temporary data injection).
- [ ] Mobile (375px) screenshot confirming the rest of the page is unchanged vs. the approved baseline.
- [ ] Graceful-empty-state decision recorded; implemented only if the team confirms it is wanted.
- [ ] `npm run lint` passes.
- [ ] Any temporary data hacks reverted; committed code still fetches real Sanity data.

## Affected / related contexts
- **FEAT-004** Events Module (`features/events-module.md`) — `UpcomingEvents`, `EventCard`.
- **INFRA-004** Sanity CMS Layer (`infrastructure/sanity-cms-layer.md`) — `getUpcomingEvents`, `UPCOMING_FILTER`, graceful empty fallback.
- **CORE-002** Styling System, **UTIL-001** cn() — for any class changes.

## Out of scope
- Backend/CMS data creation, seed scripts, write tokens.
- Restyling event cards beyond what is needed for correct desktop display.
- Any change that alters the mobile rendering.
