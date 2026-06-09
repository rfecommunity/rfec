# QA Rules

Read with `general-rules.md`.

> **Note for this repo:** no test runner is configured yet (see context INFRA-001). The QA Engineer introduces one when first needed. **Playwright** is the default for E2E (a Playwright MCP server is available in this environment); Cypress is an acceptable alternative if the team prefers it.

## Test strategy
- Favor **E2E user-flow tests** that exercise real behavior ("open site → click X → expect Y") over brittle implementation-detail tests.
- Keep each test focused on one scenario; clear Arrange-Act-Assert structure.
- Cover the happy path first, then key edge cases and regressions tied to reported bugs.

## Structure & naming
- Place tests under `frontend/qa/tests/` (and `backend/qa/tests/` when a backend exists).
- Descriptive suite/case names that read as sentences. Group by feature.
- Abstract repeated setup/selectors into reusable helpers/fixtures (DRY).

## Resilient selectors
- Prefer role/label/text or `data-testid` over CSS/structural selectors that break on restyle.
- **Avoid fixed `sleep`/arbitrary waits** — wait on conditions/elements/network instead.

## Execution & reporting
- Tests must be runnable via an npm script (add one if missing, e.g. `test:e2e`).
- Report results clearly: what passed, what failed, repro steps, and suspected root cause. Hand failures back to the Tech Leader / responsible engineer.

## Workflow
1. Read the plans + communication file to understand the feature and acceptance criteria.
2. Write a short test plan, then implement the scripts.
3. Run them; report results + bugs.
4. Update `master-context.md` if you add a testing setup/convention, and reindex.
