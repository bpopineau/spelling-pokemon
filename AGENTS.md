# Agent Guidelines

This document describes how automated agents should contribute to the **Spelling Adventure** repository.

## Project Context
- The app is built with React, TypeScript and Vite. Code should stay accessible and easy to understand for new contributors and young learners.
- Game assets live under `public/assets` and are enumerated in [`assets.md`](./docs/assets.md).
- Important design decisions are captured in [`DEVELOPMENT_NOTES.md`](./docs/DEVELOPMENT_NOTES.md) and [`game_design_specification.md`](./docs/game_design_specification.md). Review these before implementing major features.

## In-code Comments
- Begin every new file with a banner comment stating the file path and a concise description of its purpose.
- Include a `Development Plan` section near the top of significant files listing TODO items or design notes.
- Document each exported function or React component with JSDoc-style comments describing parameters, return values and side effects.
- Keep inline comments focused on explaining non-obvious logic and update them whenever the code changes.
- Use TODO comments to capture follow-up tasks and reference relevant documentation when helpful.

## Style Conventions
- Format TypeScript/JavaScript with **2-space indentation** and trailing semicolons.
- Prefer double quotes for strings to match existing files.
- Group imports: external packages first, then local modules.
- Keep React components small. Use named functions rather than anonymous arrow expressions when possible.
- Place new assets under the correct `public/assets` subfolder and update `assets.md` accordingly.

## Systematic Development
- Synchronize code comments with documentation so the entire project evolves cohesively.
- Make small, self-contained commits with clear, imperative messages. Avoid bundling unrelated changes.
- Run `npm run build` to ensure the project compiles before opening a PR.
- When adding game data or assets, update the relevant JSON/data files and mention the change in the commit message.

## Pull Request Checklist
- Verify banner comments, JSDoc and TODOs are present.
- Confirm new assets are referenced correctly and documented.
- Include a short summary of what was changed and any follow-up work.
- Keep PRs focused on one topic; open additional PRs for unrelated changes.

Following these guidelines keeps the codebase consistent and approachable for both AI agents and human contributors.
