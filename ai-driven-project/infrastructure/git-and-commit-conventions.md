```json ai-meta
{
  "id": "INFRA-003",
  "name": "Git & Commit Conventions",
  "category": "infrastructure",
  "lang": ["en-US"],
  "tags": ["git", "husky", "commitlint", "conventional-commits", "hooks"],
  "dependencies": ["INFRA-002"],
  "stack": "next-app-router-website"
}
```

# Context: Git & Commit Conventions
**ID**: INFRA-003
**Category**: infrastructure
**Last Updated**: 2026-06-07T00:00:00Z
**Dependencies**: INFRA-002
**Description**: Conventional Commits enforced by commitlint + the Husky pre-commit / commit-msg hooks.

## Summary
The repo enforces **Conventional Commits** via commitlint on a Husky `commit-msg` hook, and runs `lint-staged` on a `pre-commit` hook. Non-conforming commit messages are rejected. This convention also governs how AI agents must commit context-system changes.

## Key Information
- **Husky**: hooks live in `.husky/`; installed by the `prepare: husky` script (INFRA-001).
  - `pre-commit` → runs `lint-staged` (Prettier `--write` + ESLint `--fix`, see INFRA-002).
  - `commit-msg` → runs commitlint.
- **commitlint**: `commitlint.config.js` extends `@commitlint/config-conventional`. Allowed types: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `vercel`.
- **Message format**: `type(scope): subject` — e.g. `docs(context): add partners-carousel context`.
- **Context-system commits** (this `ai-driven-project/`): use type `docs` (or `chore` for tooling) with scope `context`, e.g.
  - `docs(context): update FEAT-003 after carousel change`
  - `chore(context): reindex master-context`
- **Workflow**: stage files → commit; the hooks auto-format and validate. If a commit is rejected for message format, fix the type/scope, don't bypass with `--no-verify`.

## Code References
- `.husky/` — `pre-commit`, `commit-msg` hooks
- `commitlint.config.js` — allowed types / conventional config
- `package.json` — `prepare: husky`

## Related Contexts
- [INFRA-002](../infrastructure/linting-and-formatting.md) — what pre-commit runs
- [INFRA-001](../infrastructure/build-and-runtime.md) — `prepare` hook install

## Change Log
- 2026-06-07T00:00:00Z — Initial context created from Husky + commitlint config.
