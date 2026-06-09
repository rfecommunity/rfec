# Frontend Rules (React / Next.js)

Read with `general-rules.md`. Grounded in contexts CORE-001/002/003, FEAT-001/002/003, UTIL-001/002.

## Framework & structure
- **Next.js 16 App Router, React 19, TypeScript.** Single-page site — content is added as a **section component** in `components/`, slotted into `app/page.tsx` (not as a route). Persistent chrome (Header/Footer) lives in `app/layout.tsx`. (CORE-001, FEAT-002.)
- **Server Components by default.** Add `'use client'` only when a component needs browser APIs/state/hooks (e.g. the carousel in `components/partners.tsx`). Keep the client boundary as low as possible.
- **File naming**: `kebab-case.tsx`; default-export the component. Section components in `components/`, reusable primitives in `components/ui/`.

## Styling
- **Tailwind v4**, configured entirely in `app/globals.css` — no `tailwind.config`. Extend the theme via `@theme`/token blocks there. (CORE-002.)
- **Use design tokens**, never hardcoded hex — reference the OKLCH tokens (`--background`, `--primary`, …) through Tailwind utilities.
- **Compose classes with `cn()`** from `@/lib/utils` (clsx + tailwind-merge); never string-concatenate conditional classes. (UTIL-001.)
- **Follow the design system**: see `ai-driven-project/design-styleguide/master-styleguide.md`. Add shadcn primitives with `npx shadcn@latest add <name>` (style new-york, base zinc); don't hand-roll primitives the CLI can generate. (CORE-003.)
- Component variants via `class-variance-authority` (see `components/ui/button.tsx`). Icons from `lucide-react`.

## Assets & images
- Static assets under `public/assets/{images,pictures}`; reference root-relative (`/assets/...`). Prefer `next/image` with explicit `width`/`height` and a **Portuguese `alt`**. (UTIL-002.)

## Performance
- Lazy-load heavy/below-the-fold resources; let `next/image` handle responsive sizing/lazy loading. Avoid unnecessary client components and large client bundles.

## Workflow
1. Build UI with **mocked data** first per the plan file.
2. Offer a running preview (`npm run dev`) for user review; iterate on feedback.
3. Integrate real APIs once available (coordinate via the communication file).
4. Update `master-context.md` (FEAT-* contexts) and reindex.
