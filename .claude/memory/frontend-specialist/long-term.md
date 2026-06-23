# FrontEnd Specialist (React) — Long-Term Memory

> Durable knowledge that stays useful across many tasks: stable file locations, recurring patterns, architectural decisions, conventions learned. Append newest-first. Keep entries terse.

## Events empty-state (2026-06)

- `components/upcoming-events.tsx` is an `async` Server Component fetching `getUpcomingEvents()` from `@/sanity/lib/queries`. It previously `return null` on empty data, hiding the whole `#events` section at all widths (live `production` dataset often has 0 future events). Decision: ALWAYS render section; show a dark-themed empty-state card when no events. Card pattern on the `bg-zinc-950` section: `mx-auto max-w-md` centered, `border-white/10 bg-white/5`, `CalendarX` (lucide) icon `text-zinc-500`, heading `text-white`, sub-line `text-zinc-400` (do NOT use light-theme `text-muted-foreground` on dark sections).
- To screenshot a data-dependent Server Component without real CMS data: temporarily inject a typed stub array (`stub as typeof events`) gated by `events.length ? events : stub`, screenshot, then REVERT so committed source fetches real data. Use events with no `banner` so `EventCard` falls back to its `CalendarDays` icon (no Sanity image fetch needed).
- Playwright MCP / ToolSearch NOT enabled in this context (confirmed again). Same fallback works: `/tmp/shot.mjs` importing `chromium` from `/home/alisson/.npm/_npx/86170c4cd1c5da32/node_modules/playwright/index.mjs`, launch `{ channel: 'chrome' }`, `goto` waitUntil `networkidle`, `scrollIntoView('#events')`, screenshot. Dev server runs on **3001** (3000 taken).

## Desktop polish pass (2026-06)

- **Mobile = base (unprefixed) styles.** This site is mobile-first; every base utility renders on mobile. To improve desktop WITHOUT touching mobile, only add `md:`/`lg:`/`xl:` overrides. Never change a base utility that has a visual effect at <768px. Even `text-balance`/`text-pretty`, `size="lg"` on Button, and `gap`/`padding` base values shift mobile — scope them with `md:`.
- **Verifying mobile unchanged:** render before/after at 375px and pixel-diff. Used pngjs (CommonJS) from another project's node_modules; target = 0% diff and identical PNG height.
- **Playwright MCP tools were NOT enabled in this context.** Fallback that works: `chromium` from a `_npx` playwright install (`/home/alisson/.npm/_npx/<hash>/node_modules/playwright`) launched with `{ channel: 'chrome' }` (system google-chrome at /usr/bin/google-chrome). Write a small ESM script taking viewport widths, `goto` with `waitUntil:'networkidle'`, `fullPage` screenshots. No standalone chromium build is installed (only mcp-chrome-* dirs).
- **Container:** Tailwind v4 `container` utility centers + has breakpoint max-widths; on mobile it's 100% width so adding `mx-auto`/`container` to a previously-unconstrained section is a no-op on mobile but caps/centres on desktop (used on Hero).
- **TitleWithTag** (`components/title-with-tag.tsx`) is the shared section-heading w/ blue indicator bar. Bar scales responsively now (mobile `w-2 h-6 rounded-sm`, `md:w-1.5 md:h-8 md:rounded-full lg:h-10`). Section titles sized at call sites: `text-2xl md:text-3xl lg:text-4xl`.
- **Section rhythm:** sections are `px-5 py-20`; desktop adds `lg:py-28`. Section body paragraphs constrained to `md:max-w-2xl md:text-lg` for readable measure on wide screens.
- **Partners carousel** (`components/partners.tsx`): items were `basis-1/2` (only 2 logos, clipped on desktop). Now `basis-1/2 md:basis-1/3 lg:basis-1/4`.
- **Footer** (`components/footer.tsx`): `container` lacked `mx-auto` (left-aligned on desktop) — added. Grid was `md:grid-cols-4` w/ only 2 children (empty right half) — now `md:grid-cols-[1.5fr_1fr]`. Mail social `<a>` was missing `aria-label`. Mobile divider/spacing preserved via `md:` overrides.
- **Button focus states** already solid (`focus-visible:ring`) in `components/ui/button.tsx`.
- Pre-existing advisories (not in scope): Hero/Join LCP images lack `priority`; some images set one of width/height.
