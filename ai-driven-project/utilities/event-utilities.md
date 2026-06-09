```json ai-meta
{
  "id": "UTIL-003",
  "name": "Event Utilities",
  "category": "utilities",
  "lang": ["en-US", "pt-BR"],
  "tags": ["events", "date-format", "intl", "timezone", "america-recife", "site-url", "absolute-url", "sitemap", "metadata"],
  "dependencies": ["FEAT-004"],
  "stack": "next-app-router-website"
}
```

# Context: Event Utilities
**ID**: UTIL-003
**Category**: utilities
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: FEAT-004
**Description**: Date formatting helpers (America/Recife timezone) and site URL utilities for metadata/sitemap.

## Summary
Two small utility modules support the Events feature: `lib/events.ts` provides `Intl.DateTimeFormat`-based date/time formatters fixed to the `America/Recife` timezone and locale `pt-BR`, plus `isPastEvent` which mirrors the GROQ `coalesce(endAt, startAt) < now()` filter so UI and queries agree. `lib/site.ts` provides the canonical `SITE_URL` constant and an `absoluteUrl` helper used for JSON-LD, Open Graph metadata, sitemap entries, and `robots.ts`.

## Key Information

### `lib/events.ts`
- **`formatEventDate(iso: string)`** — Returns `"12 de março de 2025"` (day + long month + year, no time).
- **`formatEventDateTime(iso: string)`** — Returns `"12 de março de 2025, 19:00"` (date + hour:minute).
- **`formatEventTime(iso: string)`** — Returns `"19:00"` (hour:minute only); used for agenda item times.
- All three use `new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Recife' })`.
- **`isPastEvent(event: Pick<EventListItem, 'startAt' | 'endAt'>)`** — Returns `true` when `coalesce(endAt, startAt)` is before `Date.now()`. Mirrors the GROQ filter in `sanity/lib/queries.ts` so past-event conditional rendering stays consistent with query results.

### `lib/site.ts`
- **`SITE_URL`** — Reads `NEXT_PUBLIC_SITE_URL` (defaults to `https://recifefrontend.com.br`). Trailing slash stripped. Used in `app/sitemap.ts`, `app/robots.ts`, and `event-json-ld.tsx`.
- **`absoluteUrl(path: string)`** — Prepends `SITE_URL` to a root-relative path; handles missing leading slash.

## Code References
- `lib/events.ts:1` — `formatEventDate`, `formatEventDateTime`, `formatEventTime`, `isPastEvent`
- `lib/site.ts:1` — `SITE_URL`, `absoluteUrl`
- `app/(site)/eventos/[slug]/page.tsx:17` — consumes `formatEventDateTime`, `isPastEvent`, `absoluteUrl`
- `app/(site)/eventos/page.tsx:1` — consumes query helpers (not directly these utils)
- `app/sitemap.ts:3` — consumes `SITE_URL`
- `app/robots.ts:3` — consumes `SITE_URL`
- `components/events/event-card.tsx:6` — consumes `formatEventDate`
- `components/events/event-json-ld.tsx:1` — consumes `absoluteUrl` (via detail page)

## Related Contexts
- [FEAT-004](../features/events-module.md) — the primary consumer of these utilities
- [INFRA-004](../infrastructure/sanity-cms-layer.md) — `EventListItem` type imported by `isPastEvent`

## Change Log
- 2026-06-07T00:00:00Z — Initial context created for event utilities (lib/events.ts + lib/site.ts).
