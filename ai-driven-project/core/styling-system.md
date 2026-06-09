```json ai-meta
{
  "id": "CORE-002",
  "name": "Styling System (Tailwind v4)",
  "category": "core",
  "lang": ["en-US", "pt-BR"],
  "tags": ["tailwind", "tailwind-v4", "css", "design-tokens", "oklch", "globals.css"],
  "dependencies": ["UTIL-001"],
  "stack": "next-app-router-website"
}
```

# Context: Styling System (Tailwind v4)
**ID**: CORE-002
**Category**: core
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: UTIL-001
**Description**: Tailwind v4 configured in CSS only (no JS config); tokens, theme vars, and the cn() rule.

## Summary
Styling is Tailwind CSS v4 configured **entirely in `app/globals.css`** through `@tailwindcss/postcss`. There is **no `tailwind.config.js`** — theme, tokens, and plugins live in CSS via `@theme`, `@plugin`, and `@custom-variant`. Design tokens are OKLCH CSS variables with light/`.dark` sets. Class composition always goes through the `cn()` helper.

## Key Information
- **Entry**: `app/globals.css` starts with `@import 'tailwindcss';` then `@plugin "tailwindcss-animate";` and `@custom-variant dark (&:is(.dark *));`.
- **Theme bridge**: the `@theme { --font-sans: var(--font-geist-sans); --font-mono: var(--font-geist-mono); }` block maps the Geist font variables (set in `app/layout.tsx`) into Tailwind's font scale.
- **Design tokens**: `:root` defines OKLCH variables — `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--radius` (0.65rem), etc. A `.dark` block (if present) overrides them. Reference tokens via Tailwind utilities, not raw hex.
- **PostCSS**: `postcss.config.mjs` registers `@tailwindcss/postcss`. This is the only build step for CSS.
- **No config file**: do NOT create `tailwind.config.{js,ts}`. Extend the theme by editing `@theme` / token blocks in `app/globals.css`.
- **Class composition**: build conditional/merged class strings with `cn()` from `lib/utils.ts` (see UTIL-001), never by string concatenation, so conflicting Tailwind classes are de-duplicated.
- **Variants**: component-level variants use `class-variance-authority` (see CORE-003 / `components/ui/button.tsx`).

## Code References
- `app/globals.css:1` — `@import`, `@plugin`, `@custom-variant`
- `app/globals.css:7` — `@theme` font mapping
- `app/globals.css:12` — `:root` OKLCH design tokens (`--radius`, color scale)
- `postcss.config.mjs` — Tailwind v4 PostCSS plugin
- `lib/utils.ts:1` — `cn()` helper (UTIL-001)

## Related Contexts
- [CORE-001](../core/app-router-and-composition.md) — layout sets the font variables this theme consumes
- [CORE-003](../core/design-system.md) — primitives + CVA variants built on these tokens
- [UTIL-001](../utilities/cn-class-helper.md) — `cn()` class merger

## Change Log
- 2026-06-07T00:00:00Z — Initial context created from `app/globals.css` and `postcss.config.mjs`.
