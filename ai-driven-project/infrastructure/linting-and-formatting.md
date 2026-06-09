```json ai-meta
{
  "id": "INFRA-002",
  "name": "Linting & Formatting",
  "category": "infrastructure",
  "lang": ["en-US"],
  "tags": ["eslint", "prettier", "import-order", "lint-staged", "flat-config"],
  "dependencies": ["INFRA-001", "INFRA-003"],
  "stack": "next-app-router-website"
}
```

# Context: Linting & Formatting
**ID**: INFRA-002
**Category**: infrastructure
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: INFRA-001, INFRA-003
**Description**: ESLint flat config, Prettier, and the enforced import-ordering rule.

## Summary
Code style is enforced by ESLint (flat config) + Prettier, wired into a pre-commit `lint-staged` step. The notable hard rule: **import ordering is an ESLint error**, not a stylistic preference — let `--fix`/Prettier sort imports instead of ordering by hand.

## Key Information
- **ESLint**: flat config in `eslint.config.mjs`, extending `eslint-config-next` and `eslint-config-prettier`. Run with `npm run lint` (`eslint .`).
- **Import ordering (enforced)**: groups must be `builtin` → `external` → `internal`, alphabetized, with `react` pulled to the front of externals, and a blank line between groups. Violations fail lint. See the import blocks in `app/layout.tsx` / `components/partners.tsx` as canonical examples.
- **Prettier**: settings in `.prettierrc.json`; ignore patterns in `.prettierignore`.
- **lint-staged** (`.lintstagedrc.js`): on staged JS/TS files runs Prettier `--write` then ESLint `--fix`. Invoked by the Husky pre-commit hook (INFRA-003).
- **Legacy config removed**: `.eslintrc.json` was deleted in favor of the flat `eslint.config.mjs` — do not reintroduce the legacy file.
- **Editor**: `.editorconfig` + `.vscode/` provide baseline editor settings.
- **AI rule**: never hand-sort imports; write them roughly grouped and rely on `--fix`. Run `npm run lint` before declaring a change done.

## Code References
- `eslint.config.mjs` — flat ESLint config + import-order rule
- `.prettierrc.json`, `.prettierignore` — formatting config
- `.lintstagedrc.js` — staged-file pipeline (Prettier → ESLint)
- `.editorconfig` — editor defaults

## Related Contexts
- [INFRA-001](../infrastructure/build-and-runtime.md) — `npm run lint` script
- [INFRA-003](../infrastructure/git-and-commit-conventions.md) — Husky hook that runs lint-staged

## Change Log
- 2026-06-07T00:00:00Z — Initial context; notes migration from `.eslintrc.json` to flat config.
