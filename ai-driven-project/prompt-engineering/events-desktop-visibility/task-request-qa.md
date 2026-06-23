# Plan — QA verification: events section on desktop, mobile unchanged

**Owner:** qa-specialist
**Communication file (read + update):** `.claude/communication/events-desktop-visibility.md`

## Goal
Independently confirm the events section renders on desktop and that the approved mobile layout is unregressed.

## Verification checklist
- [ ] With sample upcoming data present (temporary injection, then reverted by frontend), the `<section id="events">` renders at 1280 / 1440 / 1920 px: heading "Próximos Eventos", intro copy, the responsive card grid (`sm:grid-cols-2 lg:grid-cols-3`), and the "Ver todos os eventos" CTA.
- [ ] Mobile (375px) full-page render matches the approved baseline (no diff introduced by this task).
- [ ] Confirm the committed code still fetches real Sanity data (no leftover mock/filter hack).
- [ ] `npm run lint` passes.
- [ ] Confirm the documented root cause holds: with the real (empty-upcoming) dataset, the section is correctly absent at all widths — this is data, not a CSS bug.

## Notes
- Today is 2026-06-21; the only dataset event ended 2026-06-10, so the real fetch yields an empty upcoming list by design.
- Do NOT mutate the production Sanity dataset. Do NOT commit.
