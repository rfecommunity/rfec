# Prompt Engineering — Plan Folders

The Tech Leader creates one folder per task here:

```
ai-driven-project/prompt-engineering/<PLAN_NAME>/
├── task-request-frontend.md   # high-level frontend plan (no code) — for the Frontend Specialist
├── task-request-backend.md    # high-level backend plan (no code)  — for the Backend Engineer
├── task-request-qa.md         # (optional) QA scope/acceptance criteria — for the QA Engineer
└── done.md                    # final summary + table of work completed
```

## Conventions
- `PLAN_NAME` is `kebab-case`, short and descriptive (e.g. `events-section`, `newsletter-signup`).
- Plan files contain **high-level instructions only** — *what* and *why*, acceptance criteria, constraints, and links into `ai-driven-project/master-context.md`. They never contain implementation code (that is the engineers' job).
- If a task spans ≥2 agents, the Tech Leader also creates `.claude/communication/<PLAN_NAME>.md` and points every agent at it.
- `done.md` is written last and summarizes changes + links the touched contexts.

See `ai-driven-project/master-context.md` for the context system and `agents-architecture.md` (repo root) for the full team workflow.
