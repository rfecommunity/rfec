```json ai-meta
{
  "id": "INFRA-004",
  "name": "Sanity CMS Layer",
  "category": "infrastructure",
  "lang": ["en-US", "pt-BR"],
  "tags": ["sanity", "cms", "groq", "next-sanity", "draft-mode", "preview", "revalidation", "webhook", "schemas", "studio"],
  "dependencies": ["INFRA-001", "CORE-001"],
  "stack": "next-app-router-website"
}
```

# Context: Sanity CMS Layer
**ID**: INFRA-004
**Category**: infrastructure
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: INFRA-001, CORE-001
**Description**: Sanity CMS integration: client, fetch wrapper, GROQ queries, schemas, Studio, and webhooks.

## Summary
The Sanity CMS layer connects the RFEC Next.js site to a Sanity v3 project for managing event content. It consists of: environment config (`sanity/env.ts`), a typed client (`sanity/lib/client.ts`), a `sanityFetch` wrapper with draft-mode awareness and graceful degradation (`sanity/lib/fetch.ts`), GROQ queries and typed helpers (`sanity/lib/queries.ts`), TypeScript types (`sanity/lib/types.ts`), an image URL builder (`sanity/lib/image.ts`), a server-only read token (`sanity/lib/token.ts`), document and object schemas (`sanity/schemaTypes/`), an embedded Studio at `/studio` (`sanity.config.ts`, `sanity.cli.ts`, `app/studio/[[...tool]]/page.tsx`), and an on-demand revalidation webhook (`app/api/revalidate/route.ts`). The site degrades gracefully to empty states when Sanity is unconfigured.

## Key Information

### Environment & Configuration
- **`sanity/env.ts`** — Reads `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION` (default `2024-10-01`). Exports `isSanityConfigured` (true when `projectId` is non-empty).
- **Required env vars** (see `.env.example`):
  - `NEXT_PUBLIC_SANITY_PROJECT_ID` — Sanity project ID
  - `NEXT_PUBLIC_SANITY_DATASET` — dataset name (default: `production`)
  - `NEXT_PUBLIC_SANITY_API_VERSION` — API date string
  - `SANITY_API_READ_TOKEN` — read token for draft/preview (server-only)
  - `SANITY_REVALIDATE_SECRET` — shared secret for webhook signature verification
  - `NEXT_PUBLIC_SITE_URL` — canonical site URL (also consumed by `lib/site.ts`)

### Client (`sanity/lib/client.ts`)
- Creates a `next-sanity` client with `useCdn: true` and `perspective: 'published'`. Returns `null` when `isSanityConfigured` is false, enabling graceful degradation site-wide.

### Fetch Wrapper (`sanity/lib/fetch.ts`)
- `sanityFetch<T>(options)` — two execution paths:
  - **Published** (default): CDN + Next.js `next: { revalidate, tags }` caching. Statically generated; freshness driven by on-demand revalidation.
  - **Draft** (preview cookie set): authenticated client with `useCdn: false`, `perspective: 'drafts'`, `cache: 'no-store'`. Uses `readToken` from `sanity/lib/token.ts`.
- `EVENTS_TAG = 'events'` — broad cache tag for all event listing/sitemap fetches.
- `eventTag(slug)` — narrow per-event tag, e.g. `event:meetup-react-2025`.
- Errors are caught; returns `null` on failure so a CMS outage yields empty states.
- `draftMode()` is called inside a try/catch so `generateStaticParams` (outside request scope) does not throw.

### Image Helper (`sanity/lib/image.ts`)
- `urlForImage(source)` — returns an `@sanity/image-url` builder with `.auto('format').fit('crop')` pre-applied (serves AVIF/WebP; honors hotspot).
- `getImageUrl(source, { width, height? })` — null-safe helper used in all components; returns `null` when the image has no uploaded asset.
- `next.config.ts` allows `https://cdn.sanity.io/images/**` as a remote pattern so `next/image` can optimize Sanity-hosted images.

### GROQ Queries & Typed Helpers (`sanity/lib/queries.ts`)
- All queries defined with `defineQuery()` from `next-sanity` for type inference.
- Upcoming/past distinction uses GROQ `now()` evaluated server-side (not a `$now` param) to keep cache keys stable: `coalesce(endAt, startAt) >= now()`.
- Exported async helpers (each calls `sanityFetch`):
  - `getUpcomingEvents(tag?)` → `EventListItem[]`
  - `getPastEvents({ tag?, page?, pageSize? })` → `{ items, total, pageSize }`
  - `getEventTags()` → `TagRef[]` (only tags used by at least one event)
  - `getEventSlugs()` → `string[]` (used by `generateStaticParams` + sitemap)
  - `getEventBySlug(slug)` → `EventDetail | null`
  - `getEventGallery(slug)` → `EventGallery | null`

### TypeScript Types (`sanity/lib/types.ts`)
- `SanityImage`, `TagRef`, `EventTypeRef`, `EventLocation`, `SocialLink`, `Speaker`, `SpeakerSummary`, `Sponsor`, `AgendaItem`, `GalleryPhoto`, `LinkedResource`, `PastAssets`
- `EventListItem` — card shape (listing page)
- `EventDetail extends EventListItem` — full shape (detail page)
- `EventGallery` — gallery-only shape
- `EventStatus = 'upcoming' | 'past'`

### Schemas (`sanity/schemaTypes/`)
**Documents** (content types editable in the Studio):
- `event` — main document; fields: title, slug, banner (hotspot), shortDescription (≤200 chars), fullDescription (PortableText), featured, startAt (required), endAt, location (`eventLocation` object), eventType (reference), tags (references), registrationUrl, agenda, speakers (references), sponsors (references), gallery (`eventGallery` object), pastAssets (`pastAssets` object), seo.
- `speaker` — name, photo, role, company, bio, social.
- `sponsor` — name, logo, website, tier.
- `tag` — title, slug.
- `eventType` — title, slug.

**Objects** (embedded in documents, not standalone):
- `eventLocation` — name, address, mapUrl, isOnline.
- `agendaItem` — title, description, startTime, endTime, speaker (reference).
- `galleryPhoto` — image (hotspot), caption, isHighlight.
- `eventGallery` — cover, externalAlbumUrl, photos array.
- `linkedResource` — label, url.
- `pastAssets` — slidesUrl, videoUrls, repositories, resources.
- `seo` — title, description, ogImage.
- `socialLink` — platform, url.

### Embedded Studio
- `sanity.config.ts` — `defineConfig` with `basePath: '/studio'`, Structure tool (events first, then speakers/sponsors/tags/event types), Presentation tool (live preview via `/api/draft-mode/enable`), Vision tool.
- `app/studio/[[...tool]]/page.tsx` — mounts `<NextStudio>` outside the `(site)` route group (no marketing Header/Footer). `export const dynamic = 'force-static'`; exports `metadata`/`viewport` from `next-sanity/studio` (sets `noindex`).
- `sanity/structure.ts` — `StructureResolver` that orders the Studio desk.

### On-Demand Revalidation & Draft Routes
- **`app/api/revalidate/route.ts`** — POST endpoint; verifies `SANITY_REVALIDATE_SECRET` signature via `next-sanity/webhook`'s `parseBody`. On success: calls `revalidateTag(EVENTS_TAG, 'max')` and (when `slug.current` is present) `revalidateTag(eventTag(slug), 'max')`. The `'max'` second argument is Next.js 16's required cache-life profile for on-demand purge.
- **`app/api/draft-mode/enable/route.ts`** — `GET` handler via `defineEnableDraftMode`; sets the preview cookie. Degrades to 501 when the client or read token is absent.
- **`app/api/draft-mode/disable/route.ts`** — disables draft mode (called by `DisableDraftMode` client component).

## Code References
- `sanity/env.ts:1` — environment config + `isSanityConfigured`
- `sanity/lib/client.ts:1` — Sanity client (null-safe)
- `sanity/lib/fetch.ts:1` — `sanityFetch`, `EVENTS_TAG`, `eventTag`
- `sanity/lib/image.ts:1` — `urlForImage`, `getImageUrl`
- `sanity/lib/queries.ts:1` — GROQ queries + typed async helpers
- `sanity/lib/types.ts:1` — TypeScript types for all Sanity-sourced data
- `sanity/lib/token.ts:1` — server-only read token
- `sanity/structure.ts:1` — Studio desk structure
- `sanity/schemaTypes/documents/event.ts:1` — event document schema
- `sanity/schemaTypes/documents/speaker.ts:1`
- `sanity/schemaTypes/documents/sponsor.ts:1`
- `sanity/schemaTypes/documents/tag.ts:1`
- `sanity/schemaTypes/documents/eventType.ts:1`
- `sanity/schemaTypes/objects/eventLocation.ts:1`
- `sanity/schemaTypes/objects/agendaItem.ts:1`
- `sanity/schemaTypes/objects/galleryPhoto.ts:1`
- `sanity/schemaTypes/objects/eventGallery.ts:1`
- `sanity/schemaTypes/objects/linkedResource.ts:1`
- `sanity/schemaTypes/objects/pastAssets.ts:1`
- `sanity/schemaTypes/objects/seo.ts:1`
- `sanity/schemaTypes/objects/socialLink.ts:1`
- `sanity.config.ts:1` — Studio config (Presentation + Vision + Structure tools)
- `app/studio/[[...tool]]/page.tsx:1` — embedded Studio route
- `app/api/revalidate/route.ts:1` — on-demand revalidation webhook
- `app/api/draft-mode/enable/route.ts:1` — enable draft mode
- `app/api/draft-mode/disable/route.ts:1` — disable draft mode
- `next.config.ts:1` — `cdn.sanity.io` remote image pattern

## Related Contexts
- [INFRA-001](../infrastructure/build-and-runtime.md) — new Sanity-related dependencies listed
- [CORE-001](../core/app-router-and-composition.md) — routing context for Studio and API routes
- [FEAT-004](../features/events-module.md) — the feature layer that consumes this CMS layer

## Change Log
- 2026-06-07T00:00:00Z — Initial context created for Sanity CMS integration.
