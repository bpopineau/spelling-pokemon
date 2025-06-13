``````markdown
# 🤖 Agents.md — Guidelines for AI Agents Working on **Spelling Adventure**

The repository welcomes **autonomous or semi-autonomous AI agents** that analyze, modify, and propose changes to the codebase. This document defines expectations, guardrails, and recommended workflows so that human maintainers, CI, and agents collaborate safely and effectively.

---

## 1 Supported Agent Use-Cases

| Category                    | Examples                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Code comprehension**      | Build dependency graphs, generate architecture docs, answer “where is X used?”                            |
| **Refactoring**             | Propose modularization, rename symbols, extract hooks/components                                          |
| **Testing**                 | Generate missing unit tests, mutate tests to catch regressions                                            |
| **DX automation**           | Update README tables, sync asset manifests, bump package versions                                         |
| **Pull-request assistance** | Open a PR with description, diff summary, and self-review checklist :contentReference[oaicite:0]{index=0} |

Agents MUST **not**:

- Push directly to `main`
- Edit game data (`src/data/*`) without explicit tasks
- Commit binary assets (sprites/audio) — open an issue instead

---

## 2 Architecture & Tooling Expectations

| Requirement               | Rationale                                                                                                |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Sandboxed execution**   | No network calls except `github.com` API (use a firewalled runner) :contentReference[oaicite:1]{index=1} |
| **Plan-and-execute loop** | Break work into sub-tasks; reflect before write :contentReference[oaicite:2]{index=2}                    |
| **Deterministic output**  | Re-runs with same repo state ⇒ identical diff                                                            |
| **Small diffs**           | ≤ 400 LOC changes per PR; pass CI lint & tests                                                           |
| **Self-review**           | Comment inline why each change is safe; tag `@maintainers` only when green                               |

Recommended frameworks

- **potpie** – code-graph builder for agent context :contentReference[oaicite:3]{index=3}
- **OpenAI Codex (cloud)** – parallel task runners with sandbox :contentReference[oaicite:4]{index=4}

---

## 3 Guardrails & Safety

| Guardrail                    | Implementation                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **No secret leakage**        | Runner provides _read-only_ GITHUB_TOKEN with PR scope only                                                                     |
| **Prompt injection defense** | Strip or escape `<!-- -->`, ````` blocks, and code-fences from repo text before embedding :contentReference[oaicite:5]{index=5} |
| **Commit gate**              | CI enforces `npm run lint && npm run test`                                                                                      |
| **Rollback**                 | If tests fail, close PR and open issue summarizing failure                                                                      |

---

## 4 Recommended Workflow for a New Agent

1. **Fork** repository or create a feature branch.
2. **Clone** into sandbox; run `npm ci && npm run lint && npm run test`.
3. **Plan** — list tasks in `AGENT_PLAN.md` (auto-generated).
4. **Execute** tasks sequentially, updating the branch.
5. **Create PR** titled `agent/<feat>: <summary>` with:
   - Diff stats
   - Plan vs. results checklist
   - Failing CI rationale (if any)
6. **Wait for human review**. Merge only by maintainer approval.

---

## 5 Directory & File Contracts

- Do **not** delete or rename public APIs (`useGameStore`, routing paths, JSON schemas) without RFC.
- Keep `README.md`, `game_design_specification.md`, and `DEVELOPMENT_NOTES.md` synchronized when modifying architecture.
- New scripts must live in `scripts/` and include `--help` output.

---

## 6 Adding a New Agent Entry

Update this table in PR:

| Agent Name                     | Language  | Entrypoint                 | Scope                 | PRs |
| ------------------------------ | --------- | -------------------------- | --------------------- | --- |
| _example:_ **pokedex-doc-bot** | TS (Node) | `scripts/doc_bot/index.ts` | Doc & asset inventory | #12 |
``````
