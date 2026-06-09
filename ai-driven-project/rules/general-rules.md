# General Rules (all agents)

These apply to **every** agent. Role-specific rules live in the sibling files
(`frontend-rules.md`, `backend-rules.md`, `qa-rules.md`).

## Core principles
- **KISS** — simplest solution that works. No clever tricks, no speculative abstraction, no over-engineering. Break big problems into small single-responsibility units.
- **DRY** — abstract genuinely repeated logic; don't abstract things that merely look similar.
- **SOLID** — single responsibility, clear interfaces, dependency on abstractions where it pays off.
- **Performance by default** — mind algorithmic complexity and I/O; avoid premature optimization.
- **Maintainability** — consistent naming, modular structure, graceful error handling, comments that explain the *why* not the *what*.

## This project's hard constraints (non-negotiable)
- **Context first.** Read `ai-driven-project/master-context.md` before working; update the affected context(s) when done (see its §1 contract). Run `node ai-driven-project/cli/context.mjs validate && node ai-driven-project/cli/context.mjs index` after context edits.
- **Conventional Commits** (commitlint enforced): types `feat, fix, docs, chore, style, refactor, ci, test, revert, perf, vercel`. Never bypass hooks with `--no-verify`. (See context INFRA-003.)
- **Lint clean.** `npm run lint` must pass. Import ordering is an ESLint *error* — let `--fix`/Prettier sort imports, never hand-order. (See INFRA-002.)
- **No new config files** for things already configured in CSS (Tailwind v4 lives in `app/globals.css`; there is no `tailwind.config`). (See CORE-002.)
- **Match the surrounding code** — comment density, naming, idioms.
- **Portuguese (`pt-BR`) for all user-facing copy**; English for code/comments/docs.

## Memory & communication
- Read your `long-term.md` at the start of a task; append durable learnings at the end.
- Use `short-term.md` as a scratchpad for the active task.
- For multi-agent tasks, read/update the shared file in `.claude/communication/<PLAN_NAME>.md`.

## Definition of done
Code works → lint passes → relevant context updated & reindexed → memory updated → (multi-agent) communication file updated → conventional commit.
