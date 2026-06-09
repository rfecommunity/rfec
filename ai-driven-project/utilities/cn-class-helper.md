```json ai-meta
{
  "id": "UTIL-001",
  "name": "cn() Class Helper",
  "category": "utilities",
  "lang": ["en-US"],
  "tags": ["cn", "clsx", "tailwind-merge", "class-names", "lib"],
  "dependencies": ["CORE-002"],
  "stack": "next-app-router-website"
}
```

# Context: cn() Class Helper
**ID**: UTIL-001
**Category**: utilities
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: CORE-002
**Description**: The cn() utility (clsx + tailwind-merge) used everywhere to compose Tailwind classes.

## Summary
`lib/utils.ts` exports `cn()`, the single class-name composer for the codebase. It wraps `clsx` (conditional class logic) with `tailwind-merge` (resolves conflicting Tailwind utilities so the last one wins). Every component that builds class strings — primitives and sections alike — uses it.

## Key Information
- **Signature**: `cn(...inputs: ClassValue[]) => string`.
- **Implementation**: `twMerge(clsx(inputs))` — clsx flattens/conditionally joins, tailwind-merge dedupes conflicting Tailwind classes (e.g. `px-2 px-4` → `px-4`).
- **Import**: `import { cn } from '@/lib/utils'` (alias from INFRA-001 / `tsconfig.json`).
- **Usage rule**: never concatenate class strings manually or with template literals when conditional/merged classes are involved — always route through `cn()`. This keeps variant overrides (CVA, props `className`) predictable.
- **Consumers**: `components/ui/button.tsx`, `components/ui/carousel.tsx`, and section components.

## Code References
- `lib/utils.ts:1` — `cn()` definition (clsx + tailwind-merge)
- `components/ui/button.tsx` — representative consumer (merges CVA + incoming `className`)

## Related Contexts
- [CORE-002](../core/styling-system.md) — Tailwind v4 system `cn()` serves
- [CORE-003](../core/design-system.md) — primitives that depend on `cn()`

## Change Log
- 2026-06-07T00:00:00Z — Initial context created from `lib/utils.ts`.
