```json ai-meta
{
  "id": "CORE-001",
  "name": "App Router & Page Composition",
  "category": "core",
  "lang": ["en-US", "pt-BR"],
  "tags": ["next.js", "app-router", "rsc", "layout", "page", "sections", "route-group", "draft-mode", "studio"],
  "dependencies": ["CORE-002", "CORE-003", "FEAT-001", "FEAT-002"],
  "stack": "next-app-router-website"
}
```

# Context: App Router & Page Composition
**ID**: CORE-001
**Category**: core
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: CORE-002, CORE-003, FEAT-001, FEAT-002
**Description**: How the single-page site is assembled from the root layout and stacked section components.

## Summary
The site is a Next.js 16 App Router application. The `app/` directory now uses a `(site)` route group to scope the marketing chrome (Header/Footer) and draft-mode banner away from the embedded Sanity Studio and API routes. `app/layout.tsx` is the bare HTML shell (fonts only); `app/(site)/layout.tsx` provides Header, main, Footer, and the draft-mode banner. `app/(site)/page.tsx` composes the home page by stacking section components. The Events module adds routed pages under `app/(site)/eventos/`; the Studio is embedded at `app/studio/[[...tool]]/`.

## Key Information
- **Root layout** (`app/layout.tsx`): loads Geist Sans/Mono via `next/font/google`, sets `<html lang="pt-BR">`, and renders `{children}` bare — **no Header or Footer here**. Holds the site-level `Metadata` (title, description, `metadataBase` from `NEXT_PUBLIC_SITE_URL`).
- **Site layout** (`app/(site)/layout.tsx`): wraps all marketing/content pages. Renders `<Header>`, `<main>{children}</main>`, `<Footer>`, and conditionally `<DisableDraftMode>` when `draftMode().isEnabled` is true.
- **Home page** (`app/(site)/page.tsx`): renders, in order — `Hero` → `WhoWeAre` → `Mission` → `Join` → `Partners`. The visual order of the landing page is the JSX order here.
- **Events pages** (`app/(site)/eventos/`): list page, detail page (`[slug]`), gallery page (`[slug]/galeria`), plus `loading.tsx` / `error.tsx` boundaries. See FEAT-004.
- **Embedded Studio** (`app/studio/[[...tool]]/page.tsx`): lives outside `(site)` — no marketing chrome. Mounts `<NextStudio>` with `force-static`. The Sanity Presentation tool's preview links to `/api/draft-mode/enable`.
- **API routes**: `app/api/revalidate/route.ts` (signed Sanity webhook → `revalidateTag`), `app/api/draft-mode/enable/route.ts`, `app/api/draft-mode/disable/route.ts`. These are also outside `(site)`.
- **SEO helpers at `app/` root**: `app/sitemap.ts` (dynamic; fetches event slugs from Sanity), `app/robots.ts` (disallows `/studio` and `/api/`).
- **Server vs client**: RSC by default. Files using browser APIs/hooks declare `'use client'` (e.g. `event-filter-bar.tsx`, `gallery-grid.tsx`, `disable-draft-mode.tsx`).

## Code References
- `app/layout.tsx:1` — bare root layout: fonts, metadata, html/body only
- `app/(site)/layout.tsx:1` — site layout: Header, main, Footer, draft-mode banner
- `app/(site)/page.tsx:1` — home page section stacking order
- `app/(site)/eventos/page.tsx:1` — event list page
- `app/(site)/eventos/[slug]/page.tsx:1` — event detail page
- `app/(site)/eventos/[slug]/galeria/page.tsx:1` — event gallery page
- `app/studio/[[...tool]]/page.tsx:1` — embedded Sanity Studio
- `app/api/revalidate/route.ts:1` — on-demand revalidation webhook
- `app/sitemap.ts:1` — dynamic sitemap
- `app/robots.ts:1` — robots.txt

## Related Contexts
- [CORE-002](../core/styling-system.md) — Tailwind v4 + font variables consumed by the layout
- [CORE-003](../core/design-system.md) — shadcn/ui primitives used inside sections
- [FEAT-001](../features/landing-page-sections.md) — the section components stacked in `page.tsx`
- [FEAT-002](../features/site-navigation.md) — Header/Footer chrome (now in site layout)
- [FEAT-004](../features/events-module.md) — events pages inside the (site) route group
- [INFRA-004](../infrastructure/sanity-cms-layer.md) — Studio, API routes, and data fetching

## Change Log
- 2026-06-07T00:00:00Z — Updated for Events Module: (site) route group introduced; root layout is now bare (fonts only); site layout holds Header/Footer/draft-banner; events routes, Studio, API routes, sitemap, robots added.
- 2026-06-07T00:00:00Z — Initial context created from current `app/` structure.
