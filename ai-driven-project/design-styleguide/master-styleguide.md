# Master Style Guide — RFEC Website

The single source of truth for the design system. The Frontend Specialist **must** consult this
before building UI. It mirrors the implemented system (contexts CORE-002 / CORE-003) — keep it in
sync when tokens or primitives change.

## Foundations
- **Framework**: Next.js 16 App Router + React 19. **Styling**: Tailwind CSS v4 configured in `app/globals.css` (no `tailwind.config`).
- **Component library**: shadcn/ui — style **`new-york`**, base color **`zinc`**, RSC enabled, icons from **lucide-react**. Add primitives via `npx shadcn@latest add <name>` → `components/ui/`.
- **Class composition**: always via `cn()` (`@/lib/utils`).
- **Language**: all UI copy in **Portuguese (`pt-BR`)**.

## Design tokens (OKLCH, defined in `app/globals.css`)
Reference these through Tailwind utilities — **never hardcode colors**.

| Token | Role |
| --- | --- |
| `--background` / `--foreground` | Page background / primary text |
| `--primary` / `--primary-foreground` | Primary actions, emphasis |
| `--secondary` / `--secondary-foreground` | Secondary surfaces |
| `--muted` / `--muted-foreground` | Subdued text/surfaces |
| `--accent` / `--accent-foreground` | Accents/highlights |
| `--destructive` | Errors/destructive actions |
| `--border` / `--input` | Borders / form field borders |
| `--radius` | Corner radius base (**0.65rem**) |

A `.dark` variant set exists; support dark mode via tokens, not ad-hoc colors.

## Typography
- **Geist Sans** (`--font-geist-sans`) for UI text, **Geist Mono** (`--font-geist-mono`) for code, loaded in `app/layout.tsx` and mapped to Tailwind's `font-sans`/`font-mono` via `@theme`.

## Components & layout
- **Buttons**: use `Button` (`components/ui/button.tsx`) with its CVA variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) and sizes — don't restyle ad hoc. Use `asChild` to render as a link.
- **Carousel**: `components/ui/carousel.tsx` (embla); see `components/partners.tsx` for the auto-scroll pattern.
- **Sections**: wrap content in a centered container (`container mx-auto`), consistent vertical padding (e.g. `px-5 py-20` as in `partners.tsx`), and set a `<section id="...">` so header anchors can target it.
- **Shared heading**: use `TitleWithTag` (`components/title-with-tag.tsx`) for section titles/eyebrows.

## Imagery
- `next/image` with explicit dimensions and Portuguese `alt`; assets from `public/assets/{images,pictures}`.

## Accessibility
- Meaningful `alt` text, sufficient contrast (validate token pairings), keyboard-reachable interactive elements, and visible focus states.

> When you add or change a token/primitive/pattern, update this file **and** the relevant context (CORE-002/CORE-003) and reindex.
