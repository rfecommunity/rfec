# Events Module — Technical Implementation Plan (RFEC)

> Planning-only deliverable. No implementation code. Grounded in the real repo
> (Next.js 16 App Router, React 19, Tailwind v4 CSS-only, shadcn/ui new-york/zinc,
> single-page `pt-BR` site). CMS decision is fixed: **Sanity + next-sanity**.

## Context

The RFEC site is currently a **single-page** `pt-BR` marketing site. `app/page.tsx` stacks
section components; `app/layout.tsx` wraps `Header`/`Footer` and loads Geist fonts.

We need an **Events Module** to showcase upcoming events and preserve a history of past
events. The site stays **read-only** — all registration happens externally (Sympla).
Image storage is **not** assumed unlimited.

This module introduces the site's **first sub-routes**, **first env vars**, and **first
external runtime dependency** — a meaningful but contained architectural shift. The home
page stays intact.

---

## 0. Repo reality check (what the plan must respect)

- Site is currently single-page: `app/page.tsx` stacks sections; `app/layout.tsx` wraps `Header`/`Footer`. The module adds the site's first sub-routes; the home page stays intact.
- **No `tailwind.config`** — Tailwind v4 lives in `app/globals.css`. No new styling config files.
- shadcn/ui primitives live in `components/ui/` (only `button.tsx`, `carousel.tsx` exist today). New primitives via `npx shadcn@latest add <name>`.
- Path alias `@/*` → repo root. `cn()` in `lib/utils.ts`. Icons from `lucide-react`.
- ESLint import-ordering is an **error** (auto-fixed, never hand-ordered). Conventional Commits enforced. `pt-BR` for UI copy; English for code/docs.
- No env handling exists yet — Sanity introduces the project's first env vars and first external runtime dependency.

---

## 1. High-level architecture

Sanity (headless CMS) → next-sanity client (GROQ) → React Server Components → SSG pages,
with **on-demand revalidation** driven by signed Sanity webhooks. Registration/RSVP is
fully external (Sympla).

```
Editors ─► Sanity Studio (embedded at /studio)
              │ publish
              ▼
        Sanity Content Lake ─► Image CDN (cdn.sanity.io) + @sanity/image-url
              │ GROQ via next-sanity (server-only client)
              ▼
  Next.js App Router (RSC, SSG) ─► /eventos, /eventos/[slug], /eventos/[slug]/galeria
              ▲
              │ POST /api/revalidate (signed) → revalidateTag()
        Sanity webhook on publish/unpublish/delete
```

**Key decisions**
- **Embedded Studio** at `/studio` (single deploy/repo) in its own route group — never inherits marketing `Header`/`Footer`.
- **Server-only data layer** in `sanity/` (client, GROQ queries, image-url builder, typed results). RSC fetch with `next: { tags: [...] }`.
- **Tag-based on-demand revalidation** is the primary freshness mechanism; a coarse time-based `revalidate` (~1h) is a safety net for missed webhooks.
- **Upcoming vs. past is derived from `startAt` in GROQ**, never a manual boolean (single source of truth).

---

## 2. Data model (Sanity schemas, `sanity/schemaTypes/`)

Technical names in English; field titles/UI in `pt-BR`.

### `event` (document) — central type
| Field | Type | Notes |
| --- | --- | --- |
| `title` | string (required) | |
| `slug` | slug (required, from title) | URL key, unique |
| `banner` | image (required, hotspot) | alt text required |
| `shortDescription` | text (required, ~200) | cards, OG, meta description |
| `fullDescription` | Portable Text | rich body |
| `startAt` | datetime (required) | drives upcoming/past split |
| `endAt` | datetime (optional) | |
| `location` | object | name + address + optional `mapUrl`; `isOnline` flag |
| `eventType` | reference → `eventType` | |
| `tags` | array of reference → `tag` | filtering |
| `registrationUrl` | url (Sympla) | optional (absent for past/archived) |
| `agenda` | array of `agendaItem` (object) | schedule |
| `speakers` | array of reference → `speaker` | |
| `sponsors` | array of reference → `sponsor` | |
| `gallery` | object | cover + `photos[]` (`galleryPhoto`) + optional external album url |
| `pastAssets` | object | `slidesUrl`, `videoUrls[]`, `repositories[]`, `resources[]` (label+url) — all optional |
| `featured` | boolean | optional homepage highlight |
| `seo` | object | optional title/description/OG override |

> **Upcoming vs. past is derived from `startAt` vs. `now()` in GROQ** — never a manual
> boolean. An editor-overridable `status` is a Phase-2 nicety, not MVP.

### `speaker` (document)
`name` (req), `photo` (image, hotspot), `role`, `company`, `bio` (Portable Text/text), `social[]` ({platform, url}).

### `sponsor` (document)
`name` (req), `logo` (image), `website` (url), optional `tier`.

### `agendaItem` (object, inline on event)
`title` (req), `description`, `startTime`, `endTime`, `speaker` (reference → `speaker`, optional).

### `galleryPhoto` (object, inline on event.gallery)
`image` (req, hotspot), `caption`, `isHighlight` (boolean — controls what surfaces on the detail page vs. only the full gallery).

### `tag` (document)
`title` (req), `slug` (req).

### `eventType` (document)
`title` (req), `slug`. e.g. Meetup, Workshop, Hackathon.

**Relationship summary**
- `event` 1—N inline `agendaItem`; each `agendaItem` 0..1 → `speaker`.
- `event` N—N `speaker`, `sponsor`, `tag`; N—1 `eventType`.
- `event` 1—1 inline `gallery` containing N inline `galleryPhoto`.
- Referenced docs (speaker/sponsor/tag/eventType) are reusable across events → DRY content, smaller dataset, fewer duplicate image uploads.

---

## 3. Route structure (App Router)

```
app/
├── (site)/                       # optional refactor: move home here to share chrome cleanly
│   └── eventos/
│       ├── page.tsx              # LISTING: upcoming + past, filter by status/tag (SSG)
│       ├── [slug]/
│       │   ├── page.tsx          # EVENT DETAIL (generateStaticParams + generateMetadata)
│       │   └── galeria/page.tsx  # DEDICATED GALLERY for that event
│       └── loading.tsx           # skeleton
├── studio/[[...tool]]/page.tsx   # embedded Sanity Studio (no Header/Footer)
├── api/revalidate/route.ts       # signed Sanity webhook → revalidateTag
├── sitemap.ts                    # /eventos + every event slug
└── robots.ts
```

**Routing notes**
- Public path `/eventos` (pt-BR); component/file names stay English (`events-list`, `event-card`).
- **Filtering** (`upcoming`/`past`/tag) via `searchParams` (`/eventos?status=passados&tag=react`), server-rendered with a small `'use client'` filter bar that updates the URL → shareable deep links, SEO-clean.
- **Past events paginate** (`?pagina=2`) with bounded GROQ — they grow unbounded, never render all at once.
- Detail page's Sympla button reuses the `Button asChild` external-link pattern from `components/header.tsx`.
- Add an **"Eventos" nav link** to `Header`/`Footer`.

---

## 4. Admin / CMS workflow (Sanity Studio)

- **Embedded Studio** at `/studio`, config in `sanity.config.ts` + `sanity.cli.ts` (repo root). Structure tool lands editors on Events first; Speakers/Sponsors/Tags/Event Types as supporting collections.
- **Editorial flow:** draft → fill required fields (validation blocks publish on missing banner/slug/startAt) → preview → publish. Reusable speakers/sponsors picked via reference inputs.
- **Draft preview:** next-sanity draft mode. A gated preview route renders unpublished docs using the preview client; excluded from indexing.
- **Roles:** Sanity project members (administrator/editor). Scheduled publishing / custom workflow states are Phase 2.
- **Secrets:** `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN` (server-only, for drafts), `SANITY_REVALIDATE_SECRET`. Document in `.env.example`; never commit tokens.

---

## 5. SEO strategy

- **Per-route `generateMetadata`** on `/eventos/[slug]`: title, description (from `shortDescription` or `seo` override), canonical, OG/Twitter cards using the Sanity banner via `@sanity/image-url` (1200×630).
- **JSON-LD `Event` schema** on each detail page: `name`, `startDate`/`endDate`, `eventStatus`, `eventAttendanceMode` (online/offline), `location` (Place/VirtualLocation), `image`, `description`, `organizer` (RFEC), `offers.url` → Sympla. Highest-value SEO win for an events site (rich results).
- **Sitemap** (`app/sitemap.ts`): static routes + every published event slug (queried from Sanity). **Robots** (`app/robots.ts`): allow public, disallow `/studio` + preview.
- Prefer the curated Sanity banner for OG (editorial control, no extra render); optional `next/og` fallback only when a banner is missing.
- Past events remain indexable (permanent archive) — do not noindex.

---

## 6. Performance strategy (incl. image storage discipline)

**Rendering**
- **SSG** for listing and all detail/gallery pages via `generateStaticParams`. **On-demand tag revalidation** is the primary freshness mechanism; a coarse time-based `revalidate` (~3600s) is a safety net.
- Tag granularity: a broad `events` tag plus per-slug `event:<slug>` tags so a single publish revalidates only what changed.

**Revalidation pipeline**
- Sanity webhook (create/update/delete/publish) → `POST /api/revalidate` with `@sanity/webhook` signature verification → `revalidateTag('events')` and/or the specific slug tag. Reject unsigned requests.

**Images (storage is NOT unlimited — explicit strategy)**
- All event imagery lives in Sanity's asset CDN; never copied into `public/`.
- Serve through `@sanity/image-url` with explicit `width`/`height`/`quality`/`auto=format` (AVIF/WebP) + hotspot crop. Request only the sizes actually rendered (card, detail banner, gallery thumb vs. full).
- **Gallery lazy + paginated** — only the cover + `isHighlight` photos load on the event page; the full set lives on `/eventos/[slug]/galeria`, lazy-loaded and paginated. Never load an entire album eagerly.
- **Editorial guidance** (documented in Studio descriptions): reuse referenced speaker/sponsor assets, keep highlights curated, link out to an external album for very large dumps (Drive/Flickr field already in the model). Caps asset growth.
- Configure `next.config` `images.remotePatterns` for `cdn.sanity.io`.

**Listing scale**
- Past events paginate with bounded GROQ (`[start...end]`) + a count query; upcoming events are few and rendered in full.

---

## 7. Future improvements / extensibility

- Scheduled publishing & editorial workflow states in Studio.
- Calendar/ICS export and "add to calendar" on detail pages.
- Search across events; combined filters (type + tag + year).
- Speaker and sponsor index pages (reuse existing reference docs).
- "Notify me" hook for upcoming events.
- i18n if an en-US audience emerges (Portable Text + field-level translation).
- Live RSVP counts via Sympla API (would introduce a backend integration).
- Generated OG images via `next/og` as a richer fallback.

---

## 8. Recommended implementation phases

**Phase 0 — Foundations**
- Add deps (`next-sanity`, `sanity`, `@sanity/image-url`, `@sanity/vision`, `@sanity/webhook`), `.env.example`, `images.remotePatterns`, `sanity/` data-layer skeleton.

**Phase 1 — MVP (showcase + archive)**
- Schemas: `event`, `tag`, `eventType`, inline `agendaItem`/`galleryPhoto`, plus `speaker`, `sponsor`.
- Embedded Studio at `/studio` with validation + structure.
- Routes: `/eventos` (upcoming + past, tag/status filter, pagination) and `/eventos/[slug]` (banner, info, agenda, speakers, sponsors, Sympla button, past assets).
- SEO: `generateMetadata` + JSON-LD + sitemap/robots. Image pipeline via `@sanity/image-url`. Nav link added.
- Revalidation webhook + signed `/api/revalidate`.

**Phase 2 — Gallery & polish**
- Dedicated `/eventos/[slug]/galeria` with paginated/lazy optimized gallery; highlight photos on detail page.
- Draft/preview (draft mode) for editors.
- Loading skeletons, empty states, error boundaries; filtering UX refinements.

**Out of scope (now):** user accounts/registration (external via Sympla), payments, live RSVP sync, i18n, separate Studio hosting, automated tests (no runner configured — note as risk).

---

## 9. Conventions & guardrails to enforce during build

- New shadcn primitives (likely `badge`, `card`, `tabs`/`select`, `skeleton`, `dialog` for lightbox) via `npx shadcn@latest add` → `components/ui/`.
- Compose classes with `cn()` (`lib/utils.ts`); variants via `class-variance-authority`. Tailwind stays CSS-only (no config file).
- Sanity client is **server-only**; never expose the read token to the client bundle.
- UI copy `pt-BR`; code/comments/docs English. Let ESLint `--fix` order imports.
- This work creates new FEAT contexts (events listing, event detail, gallery) and a CMS/integration context for the Sanity data layer; touches the header/footer nav and the deps/runtime context. Run context `validate` + `index` after.
