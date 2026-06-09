# Events Module — Done Summary

Implemented **Phase 0** (foundations), **Phase 1** (MVP), and **Phase 2** (gallery
lightbox, draft/preview mode, loading/error polish, context-system update).
`npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass. The site builds
with **no Sanity env vars** present (graceful degradation to empty states), and
lights up fully once the env is configured. Draft mode does **not** regress static
generation — `/` stays static and `/eventos/[slug]` + `/galeria` stay SSG; the
build only adds the dynamic draft-mode API routes.

## What shipped

| Area | Files |
| --- | --- |
| Data layer (server-only, cached, degrades gracefully) | `sanity/env.ts`, `sanity/lib/{client,image,fetch,queries,types}.ts` |
| Schemas | `sanity/schemaTypes/**` — `event`, `speaker`, `sponsor`, `tag`, `eventType` (documents); `eventLocation`, `agendaItem`, `galleryPhoto`, `eventGallery`, `linkedResource`, `pastAssets`, `seo`, `socialLink` (objects) |
| Embedded Studio | `sanity.config.ts`, `sanity.cli.ts`, `sanity/structure.ts`, `app/studio/[[...tool]]/page.tsx` |
| Routes | `app/(site)/eventos/page.tsx` (list + filter + pagination), `app/(site)/eventos/[slug]/page.tsx` (detail), `app/(site)/eventos/[slug]/galeria/page.tsx` (gallery), `loading.tsx` |
| Layout refactor | `app/layout.tsx` (now bare html/body), `app/(site)/layout.tsx` (Header/main/Footer), home moved to `app/(site)/page.tsx` |
| Components | `components/events/**`, `components/ui/badge.tsx`, nav links in `header.tsx`/`footer.tsx` |
| SEO | `generateMetadata` + JSON-LD `Event` (`components/events/event-json-ld.tsx`), `app/sitemap.ts`, `app/robots.ts` |
| Revalidation | `app/api/revalidate/route.ts` (signed Sanity webhook → tag purge) |
| Image config | `next.config.ts` (`cdn.sanity.io` remotePattern) |

## Key implementation decisions

- **Upcoming/past derived from GROQ `now()`** (not a `$now` param) so cache keys stay stable.
- **Tag-based caching:** broad `events` tag + per-slug `event:<slug>` tag; fetches also carry a 1h `revalidate` safety net.
- **Next 16 specifics handled:** `revalidateTag(tag, 'max')` (new 2-arg signature); `SanityImageSource`/`createImageUrlBuilder` from the package root.
- **Graceful degradation:** `sanity/lib/fetch.ts` returns `null` (→ empty states) when unconfigured or on error, so a missing CMS never crashes the site.
- **Studio escapes chrome** via the `(site)` route group; Studio metadata is `noindex` and `/studio` is disallowed in robots.

## To go live (operator steps)

1. Create a Sanity project; copy `.env.example` → `.env.local` and fill:
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`,
   `SANITY_REVALIDATE_SECRET`, `NEXT_PUBLIC_SITE_URL`.
2. Add the deployed URL + `http://localhost:3333` to Sanity CORS origins.
3. Visit `/studio`, create event types / tags / speakers / sponsors, then events.
4. Configure a Sanity webhook → `POST {site}/api/revalidate`, projection including
   `_type` and `slug`, secured with `SANITY_REVALIDATE_SECRET`.

## Phase 2 — delivered

- **Draft/preview mode:** draft-aware `sanityFetch` (token + `drafts` perspective,
  uncached) at `sanity/lib/fetch.ts` + `token.ts`; `app/api/draft-mode/enable|disable`
  routes; `DisableDraftMode` banner in `app/(site)/layout.tsx`; Presentation tool in
  `sanity.config.ts`. Requires `SANITY_API_READ_TOKEN`.
- **Gallery lightbox:** `components/events/gallery-grid.tsx` — bounded initial render
  with "load more", accessible lightbox (Esc / ← → / backdrop close, body-scroll lock,
  server-precomputed thumb + full URLs).
- **Polish:** `app/(site)/eventos/[slug]/loading.tsx` skeleton, `app/(site)/eventos/error.tsx`
  boundary.
- **Context system updated** by the context-auditor: new FEAT-004 (events-module),
  INFRA-004 (sanity-cms-layer), UTIL-003 (event-utilities); updated CORE-001, FEAT-002,
  INFRA-001. CLI: 14 contexts validated, 0 errors, reindexed.

## Notes / things to watch

- The draft `perspective: 'drafts'` (in `sanity/lib/fetch.ts`) is the current
  next-sanity standard; if the Sanity API rejects it, bump `NEXT_PUBLIC_SANITY_API_VERSION`.
- Visual-editing click-to-edit overlays (stega + `<VisualEditing />`) were intentionally
  left out to avoid stega corrupting non-display fields (dates/URLs/JSON-LD). Draft
  content preview works without them.

## Still open (future / Phase 3)

- Visual editing overlays, speaker/sponsor index pages, ICS export, combined filters,
  automated tests (no runner configured).
