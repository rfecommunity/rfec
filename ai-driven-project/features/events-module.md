```json ai-meta
{
  "id": "FEAT-004",
  "name": "Events Module",
  "category": "features",
  "lang": ["pt-BR"],
  "tags": ["events", "eventos", "event-list", "event-detail", "gallery", "filter", "pagination", "sanity", "groq", "draft-mode"],
  "dependencies": ["CORE-001", "CORE-003", "INFRA-004", "UTIL-003"],
  "stack": "next-app-router-website"
}
```

# Context: Events Module
**ID**: FEAT-004
**Category**: features
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: CORE-001, CORE-003, INFRA-004, UTIL-003
**Description**: Event listing, detail, gallery pages and all events UI components (CMS-driven).

## Summary
The Events module adds a complete CMS-driven events section to the RFEC site. It covers three pages under `app/(site)/eventos/` (list, detail, gallery), thirteen UI components in `components/events/`, and a new `Badge` UI primitive. Content is fetched from Sanity CMS (see INFRA-004). All user-facing copy is Portuguese (`pt-BR`). The module integrates draft-mode preview: when a Sanity editor enables preview, a `DisableDraftMode` client banner appears in the site layout.

## Key Information

### Routes
- **`app/(site)/eventos/page.tsx`** — Event list page. Accepts `?status=upcoming|past`, `?tag=<slug>`, and `?pagina=<n>` search params. Renders `EventFilterBar` (client component) + a grid of `EventCard`s. Past events are paginated (9 per page); upcoming events show all. Exports `Metadata` for SEO.
- **`app/(site)/eventos/[slug]/page.tsx`** — Event detail page. `generateStaticParams` pre-renders all published slugs. `generateMetadata` builds full OG/Twitter metadata from Sanity fields with fallback to SEO object. Renders banner image, date/location header, `RegistrationButton` (for upcoming events), rich text, agenda, speakers, gallery preview, past assets, and sponsors.
- **`app/(site)/eventos/[slug]/galeria/page.tsx`** — Dedicated gallery page. Fetches photos from Sanity, maps them to `LightboxPhoto` shape, and renders `GalleryGrid` (client lightbox). Returns `notFound()` when there are no photos and no external album link.
- **`app/(site)/eventos/loading.tsx`** / **`error.tsx`** — Suspense and error boundaries for the list route.
- **`app/(site)/eventos/[slug]/loading.tsx`** — Suspense boundary for the detail route.

### Components (`components/events/`)
| File | Type | Purpose |
|---|---|---|
| `event-card.tsx` | Server | Card used in the listing grid; shows banner image, date, title, location, tags |
| `event-filter-bar.tsx` | Client (`'use client'`) | Status toggle (upcoming/past) + tag filter; pushes `?status` / `?tag` params via `useRouter` |
| `pagination.tsx` | Server | Previous/Next links for the past-events archive; receives `buildHref` callback |
| `event-agenda.tsx` | Server | Renders the ordered agenda (timed talk slots + speaker avatar) |
| `event-speakers.tsx` | Server | Speaker cards with photo, role, company, bio, and social links |
| `event-sponsors.tsx` | Server | Sponsor logo grid grouped by tier |
| `event-gallery-preview.tsx` | Server | Inline gallery highlights on the detail page; links to full gallery |
| `event-past-assets.tsx` | Server | Links to slides, videos, repositories, resources after an event ends |
| `event-json-ld.tsx` | Server | Emits `<script type="application/ld+json">` Event schema for SEO |
| `registration-button.tsx` | Client | CTA button linking to Sympla (or any `registrationUrl`); only shown for upcoming events |
| `portable-text.tsx` | Server | Wraps `@portabletext/react` to render `fullDescription` Portable Text blocks |
| `gallery-grid.tsx` | Client | Lightbox grid; manages open/close/navigate state for full-screen photo view |
| `disable-draft-mode.tsx` | Client | "Exit preview" banner; rendered by `app/(site)/layout.tsx` when draft mode is active |

### New UI Primitive
- **`components/ui/badge.tsx`** — shadcn/ui Badge. Variants: `default`, `secondary`, `destructive`, `outline`. Used on event cards (event type badge), detail page tags, and agenda items. Added with `npx shadcn@latest add badge`.

### SEO & Discoverability
- **`app/sitemap.ts`** — Dynamic XML sitemap; fetches event slugs from Sanity to build `/eventos/<slug>` entries.
- **`app/robots.ts`** — Disallows `/studio` and `/api/` from crawlers; points to the sitemap.
- **`event-json-ld.tsx`** — Structured data (JSON-LD Event schema) on every detail page.

### Draft / Preview
- `app/(site)/layout.tsx` renders `<DisableDraftMode />` when `draftMode().isEnabled` is true. This component (client) calls `GET /api/draft-mode/disable` to exit preview.
- The embedded Studio at `/studio` (outside the `(site)` group) uses the Presentation tool linked to `/api/draft-mode/enable`.

## Code References
- `app/(site)/eventos/page.tsx:1` — event list, filter, pagination
- `app/(site)/eventos/[slug]/page.tsx:1` — event detail
- `app/(site)/eventos/[slug]/galeria/page.tsx:1` — gallery with lightbox
- `app/(site)/eventos/loading.tsx:1`, `app/(site)/eventos/error.tsx:1` — boundaries
- `components/events/event-card.tsx:1`
- `components/events/event-filter-bar.tsx:1`
- `components/events/pagination.tsx:1`
- `components/events/event-agenda.tsx:1`
- `components/events/event-speakers.tsx:1`
- `components/events/event-sponsors.tsx:1`
- `components/events/event-gallery-preview.tsx:1`
- `components/events/event-past-assets.tsx:1`
- `components/events/event-json-ld.tsx:1`
- `components/events/registration-button.tsx:1`
- `components/events/portable-text.tsx:1`
- `components/events/gallery-grid.tsx:1`
- `components/events/disable-draft-mode.tsx:1`
- `components/ui/badge.tsx:1` — new Badge primitive
- `app/sitemap.ts:1` — dynamic sitemap
- `app/robots.ts:1` — robots.txt

## Related Contexts
- [CORE-001](../core/app-router-and-composition.md) — route group layout that frames these pages
- [CORE-003](../core/design-system.md) — Badge and Button primitives used by events UI
- [INFRA-004](../infrastructure/sanity-cms-layer.md) — Sanity data layer: fetch, queries, types, images
- [UTIL-003](../utilities/event-utilities.md) — date formatting and isPastEvent used throughout
- [FEAT-002](../features/site-navigation.md) — Header/Footer that frame every events page

## Change Log
- 2026-06-07T00:00:00Z — Initial context created for Events Module implementation.
