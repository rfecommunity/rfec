```json ai-meta
{
  "id": "FEAT-003",
  "name": "Partners Carousel",
  "category": "features",
  "lang": ["pt-BR"],
  "tags": ["partners", "carousel", "embla", "auto-scroll", "client-component", "next-image"],
  "dependencies": ["CORE-003", "FEAT-001", "UTIL-002"],
  "stack": "next-app-router-website"
}
```

# Context: Partners Carousel
**ID**: FEAT-003
**Category**: features
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: CORE-003, FEAT-001, UTIL-002
**Description**: The auto-scrolling partners section built on the embla carousel primitive.

## Summary
`components/partners.tsx` is the "Parceiros" landing section. Unlike the other sections it is a **client component** (`'use client'`) because it drives an auto-scrolling carousel via embla. It is the reference usage of the `components/ui/carousel.tsx` primitive (CORE-003) and renders partner logos with `next/image`.

## Key Information
- **Client boundary**: file starts with `'use client'` — required for embla hooks/plugins.
- **Carousel**: imports `Carousel`, `CarouselContent`, `CarouselItem` from `./ui/carousel`. Options `{ align: 'center', loop: true }`.
- **Auto-scroll**: uses `embla-carousel-auto-scroll` (`AutoScroll({ active: true, speed: 0.5 })`) passed via the carousel `plugins` prop.
- **Items**: each `CarouselItem` is `basis-1/2`; contains a `next/image` logo + caption. Partner logos come from `public/assets/images/` (e.g. `fiap.png`, `iv.png`) — see UTIL-002.
- **Title**: uses the shared `TitleWithTag` helper (FEAT-001) for the "Parceiros" heading; section `id="partners"` is the anchor target for nav (FEAT-002).
- **Adding a partner**: drop the logo in `public/assets/images/`, add a `CarouselItem` with an `<Image>` (set `alt` in Portuguese) + caption.
- **Deps**: `embla-carousel-react` + `embla-carousel-auto-scroll` (see INFRA-001).

## Code References
- `components/partners.tsx:1` — `'use client'` + section
- `components/partners.tsx:18` — `Carousel` opts + AutoScroll plugin
- `components/partners.tsx:31` — `CarouselItem` logo pattern
- `components/ui/carousel.tsx:1` — underlying primitive (CORE-003)

## Related Contexts
- [CORE-003](../core/design-system.md) — carousel primitive
- [FEAT-001](../features/landing-page-sections.md) — sibling sections + `TitleWithTag`
- [UTIL-002](../utilities/static-assets.md) — partner logo assets

## Change Log
- 2026-06-07T00:00:00Z — Initial context created from `components/partners.tsx`.
