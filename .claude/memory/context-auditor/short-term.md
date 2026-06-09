# Context Auditor — Short-Term Memory

## Task: Events Module Audit (2026-06-07) — COMPLETE

### New contexts to create
- FEAT-004: Events Module (components/events/*, app/(site)/eventos/*, routes)
- FEAT-005: Sanity CMS Data Layer (sanity/*, sanity/lib/*, sanity/schemaTypes/*)
- UTIL-003: Event Utilities (lib/events.ts, lib/site.ts)

### Contexts to update
- CORE-001: app-router-and-composition — routing changed; now has (site) route group,
  app/layout.tsx is bare html/body, app/(site)/layout.tsx has Header/Footer + draft banner.
  Home page moved to app/(site)/page.tsx. New routes for events and /studio.
- FEAT-002: site-navigation — Header/Footer moved to (site) layout (not root layout).
  Header now links to /eventos. Footer also links to /eventos.
- INFRA-001: build-and-runtime — new deps: next-sanity, sanity, @sanity/image-url,
  @sanity/vision, @sanity/webhook, styled-components, server-only.
  next.config.ts now has remotePattern for cdn.sanity.io.
  New env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION, SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET,
  NEXT_PUBLIC_SITE_URL.

### Next free IDs
- features: FEAT-004, FEAT-005 (but FEAT-005 might be better as INFRA-004 — Sanity is infra)
  Actually: sanity data layer is more infrastructure/core, but has user-facing aspect.
  Decision: FEAT-004 = Events Module (user-facing feature), INFRA-004 = Sanity CMS Layer.
  UTIL-003 = Event Utilities (lib/events.ts + lib/site.ts)

### Key code refs verified
- app/layout.tsx: bare html/body/fonts, no Header/Footer (line 1-39)
- app/(site)/layout.tsx: Header + main + Footer + DisableDraftMode banner (line 1-22)
- app/(site)/page.tsx: home page (line 1-17)
- app/(site)/eventos/page.tsx: event list with filter + pagination (line 1-97)
- app/(site)/eventos/[slug]/page.tsx: event detail (line 1-179)
- app/(site)/eventos/[slug]/galeria/page.tsx: gallery with lightbox (line 1-96)
- app/studio/[[...tool]]/page.tsx: embedded Sanity Studio (line 1-19)
- app/api/revalidate/route.ts: signed webhook -> revalidateTag (line 1-53)
- app/api/draft-mode/enable/route.ts: defineEnableDraftMode (line 1-21)
- sanity/env.ts: project config (line 1-19)
- sanity/lib/client.ts: createClient with graceful degradation (line 1-21)
- sanity/lib/fetch.ts: sanityFetch with draft/published paths (line 1-79)
- sanity/lib/image.ts: urlForImage + getImageUrl (line 1-36)
- sanity/lib/queries.ts: GROQ queries + typed helpers (line 1-170)
- sanity/lib/types.ts: TS types (line 1-136)
- sanity/lib/token.ts: server-only read token (line 1-8)
- sanity/structure.ts: Studio desk structure (line 1-18)
- sanity.config.ts: Studio config with Presentation tool (line 1-37)
- lib/events.ts: formatEventDate, formatEventDateTime, formatEventTime, isPastEvent (1-44)
- lib/site.ts: SITE_URL, absoluteUrl (1-8)
- components/events/* (13 files)
- components/ui/badge.tsx: new UI primitive
- next.config.ts: remotePattern cdn.sanity.io (line 1-15)
- app/sitemap.ts: dynamic sitemap from Sanity (line 1-24)
- app/robots.ts: exists
