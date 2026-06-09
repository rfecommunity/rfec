# Agent Communication Channel

This folder holds **shared task files** used when a task involves two or more agents (e.g. Frontend + Backend, or any agent + QA). The Tech Leader creates one file per multi-agent task and instructs each agent to read it before working and update it after.

## Naming

```
.claude/communication/<PLAN_NAME>.md
```

Use the same `PLAN_NAME` as the plan folder in `ai-driven-project/prompt-engineering/<PLAN_NAME>/`.

## Recommended file shape

```markdown
# Communication: <PLAN_NAME>
**Task:** <one line>
**Agents involved:** tech-leader, frontend-specialist, backend-engineer, senior-qa

## Shared Contract / Interfaces
<API shapes, prop contracts, data formats agreed between agents>

## Updates Log (newest first)
- <ISO-ts> [agent] <what changed / what the next agent needs to know>
```

## Rules
- **Read before you work, write after you work.** Every involved agent appends an Updates Log entry.
- Keep the **Shared Contract** section authoritative — if an interface changes, update it here first.
- This channel is for *coordination*, not a substitute for `ai-driven-project/master-context.md` (durable project context) or per-agent memory (private hints).
