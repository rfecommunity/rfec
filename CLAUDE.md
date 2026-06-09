# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing/landing site for RFEC (Recife Frontend Community), a single-page Portuguese-language (`lang="pt-BR"`) site built with Next.js 16 App Router, React 19, and Tailwind CSS v4.

## Commands

- `npm run dev` — start dev server with Turbopack
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint over the repo (`eslint .`)

There is no test runner configured.

## Architecture

- **App Router, single page.** `app/page.tsx` composes the whole site by stacking section components in order (`Hero`, `WhoWeAre`, `Mission`, `Join`, `Partners`). `app/layout.tsx` wraps everything with `Header` and `Footer` and loads the Geist fonts. To add a section, create a component in `components/` and slot it into `page.tsx`.
- **Section vs. UI components.** `components/*.tsx` are page sections (one per landing-page block). `components/ui/*.tsx` are reusable shadcn/ui primitives (`button.tsx`, `carousel.tsx`). The carousel uses `embla-carousel-react` + `embla-carousel-auto-scroll` (see `components/partners.tsx` for usage).
- **Styling.** Tailwind v4 configured entirely in `app/globals.css` (via `@tailwindcss/postcss`) — there is **no `tailwind.config` file**. Compose classes with the `cn()` helper in `lib/utils.ts` (clsx + tailwind-merge). Component variants use `class-variance-authority` (see `components/ui/button.tsx`). Icons come from `lucide-react`.
- **shadcn/ui.** Configured via `components.json` (style "new-york", base color "zinc", RSC enabled). Add primitives with `npx shadcn@latest add <name>` — they land in `components/ui/`.
- **Path alias.** `@/*` maps to the repo root (e.g. `@/components/hero`, `@/lib/utils`).
- **Assets** live in `public/assets/` (`images/`, `pictures/`).

## Conventions enforced by tooling

- **Commits must be Conventional Commits.** `commitlint` (via the Husky `commit-msg` hook) restricts the type to: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `vercel`. Non-conforming messages are rejected.
- **Pre-commit hook** runs `lint-staged`: Prettier `--write` then ESLint `--fix` on staged JS/TS files.
- **Import ordering is an ESLint error**, not just style: groups must be `builtin` → `external` → `internal`, alphabetized, with `react` pulled to the front of externals and a blank line between groups. Let `--fix` / Prettier sort imports rather than ordering by hand.
- Prettier settings live in `.prettierrc.json`; ESLint flat config in `eslint.config.mjs`.
