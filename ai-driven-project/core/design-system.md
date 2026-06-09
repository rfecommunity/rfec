```json ai-meta
{
  "id": "CORE-003",
  "name": "Design System (shadcn/ui)",
  "category": "core",
  "lang": ["en-US", "pt-BR"],
  "tags": ["shadcn", "ui-primitives", "cva", "radix", "lucide", "button", "carousel"],
  "dependencies": ["CORE-002", "UTIL-001"],
  "stack": "next-app-router-website"
}
```

# Context: Design System (shadcn/ui)
**ID**: CORE-003
**Category**: core
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: CORE-002, UTIL-001
**Description**: shadcn/ui primitives (new-york/zinc), how to add them, and the button/carousel base.

## Summary
Reusable UI primitives follow the **shadcn/ui** convention and live in `components/ui/`. The project is configured via `components.json` (style `new-york`, base color `zinc`, RSC on, lucide icons). Primitives are added with the shadcn CLI, are owned/editable in-repo, and use `class-variance-authority` for variants plus `cn()` for class merging.

## Key Information
- **Config**: `components.json` — `style: "new-york"`, `baseColor: "zinc"`, `rsc: true`, `tsx: true`, `cssVariables: true`, `iconLibrary: "lucide"`, css points to `app/globals.css`. Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.
- **Adding a primitive**: `npx shadcn@latest add <name>` → lands in `components/ui/`. Do not hand-author primitive files when the CLI can generate them.
- **Existing primitives**:
  - `components/ui/button.tsx` — `Button` with CVA `buttonVariants` (variants: default/destructive/outline/secondary/ghost/link; sizes). Built on `@radix-ui/react-slot` (`asChild`).
  - `components/ui/carousel.tsx` — embla-based carousel (`Carousel`, `CarouselContent`, `CarouselItem`, plus context/hooks). Consumed by FEAT-003.
- **Icons**: `lucide-react`. Import individual icons; size via Tailwind classes.
- **Section vs UI**: `components/ui/*` = generic, reusable, design-system primitives. `components/*` (no `ui/`) = page sections (FEAT-001). Keep that boundary.
- **Distinction**: primitives consume the CORE-002 tokens; never hardcode colors inside a primitive — use token-backed utilities.

## Code References
- `components.json` — shadcn config + aliases
- `components/ui/button.tsx:1` — `Button` + `buttonVariants` (CVA, radix Slot)
- `components/ui/carousel.tsx:1` — carousel primitive + context/hooks
- `lib/utils.ts:1` — `cn()` (UTIL-001)

## Related Contexts
- [CORE-002](../core/styling-system.md) — tokens + CVA styling layer
- [FEAT-003](../features/partners-carousel.md) — consumer of the carousel primitive
- [UTIL-001](../utilities/cn-class-helper.md) — `cn()` used by every primitive

## Change Log
- 2026-06-07T00:00:00Z — Initial context created from `components.json` and `components/ui/`.
