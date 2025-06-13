# Development Notes (Updated 2025-06-13)

This document complements inline `TODO:` comments. Each section lists guidance, open tasks, and potential improvements for the corresponding file or area.

---

## 1 Root Configuration & Docs

| File                                        | Status / Notes                                                                          |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| **README.md**                               | ✅ Completely rewritten (setup, scripts, features, CI). Keep in sync with new commands. |
| **game_design_specification.md**            | ✅ Updated lore, regions, trials. Review when adding new scenes.                        |
| **assets.md**                               | ⚠️ Must be updated whenever images / audio are added to `public/assets/`.               |
| **index.html**                              | _TODO:_ set `<title>` to **Spelling Adventure** and add favicon.                        |
| **eslint.config.js**                        | Uses ESLint v9 flat-config. Strict TS + React + Prettier.                               |
| **prettierrc.json**                         | Standard Prettier. Keep in sync with team preferences.                                  |
| **vite.config.ts**                          | Uses `vite-tsconfig-paths` + `vite-plugin-svgr`. MUI-only stack.                       |
| **tailwind.config.js / postcss.config.cjs** | **Removed** — project now relies solely on MUI.                                         |
| **tsconfig\*.json**                         | Strict + moduleResolution bundler. Maintain compatibility.                              |
| **package.json**                            | Dev scripts: `dev`, `build`, `preview`, `lint`, `format`, `test`, `test:watch`.         |

---

## 2 Source Code (`src/`)

### 2.1 Entry & Routing

| File         | Notes                                                                         |
| ------------ | ----------------------------------------------------------------------------- |
| **main.tsx** | Uses React 18 `createRoot`. Throws error if `#root` missing.                  |
| **App.tsx**  | Defines all routes, including `NotFound`. Scene route renders without header. |

### 2.2 Components

| Component                 | Key Points & TODOs                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **Header.tsx**            | Navigation links via `NavLink`; underline active route. _TODO:_ Add responsive drawer for mobile. |
| **MainLayout.tsx**        | Wraps pages with `Header`. Footer placeholder for future.                                         |
| **GameMap.tsx**           | Memoized unlock logic; keyboard-accessible hotspots. _TODO:_ extract `useSceneUnlocks` hook.      |
| **SceneView.tsx**         | Memoized scene lookup; graceful “Scene Not Found” fallback.                                       |
| **SpellingChallenge.tsx** | Refactored into smaller state blocks; TODOs to move game logic into custom hook & constants.      |
| **Controls.tsx**          | Memoized; accessible button labels. Consider keyboard shortcuts.                                  |
| **OnScreenKeyboard.tsx**  | Memoized; `aria-label`s; pixel-perfect sizing.                                                    |
| **ProgressTracker.tsx**   | Memoized selectors; uses `ProgressBar`; base XP constant inlined (100).                           |
| **Pokedex.tsx**           | Responsive grid; lazy-loads images. _TODO:_ filters/sorting + pagination.                         |
| **ProgressBar.tsx**       | ARIA progress semantics; optional compact variant TODO.                                           |

### 2.3 Services

| Service           | Status                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **gameState.ts**  | Zustand store; constants centralized; TODO: extract persistence for unit tests, pure helper for level math. |
| **ttsService.ts** | Typed helper with `SpeakOptions`; TODO: voice picker + queued speech.                                       |

### 2.4 Utilities

| File             | Notes                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **lib/utils.ts** | `cn()` helper using `clsx`; includes `tailwind-merge` for optional utility deduplication. |

---

## 3 Data (`src/data/`)

- **words.json**, **scenes.json**, **pokemon.json** — core game datasets.
- **regionHotspots.ts** — immutable hotspot list; update if map graphic changes.
- Keep JSON IDs in sync with constants in `scripts/build_pokemon_json.py`.

---

## 4 Build-Time Scripts (`scripts/`)

| Script                    | Purpose / TODO                                                                                                                         |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **build_pokemon_json.py** | Assigns Pokémon to scenes by type; now uses CLI args, TypedDict, deterministic assignment. _TODO:_ expose `--dry-run` to preview diff. |

---

## 5 Testing & CI

| Area              | Notes                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| **Vitest**        | Config in `vitest.config.ts`; DOM via happy-dom. Add tests under `src/**/__tests__`.                  |
| **Example tests** | `gameState` store spec provided; extend to components.                                                |
| **CI**            | `.github/workflows/ci.yml` lints & tests on push. _TODO:_ add build step when assets hosted remotely. |

---

## 6 Future Improvements

1. **Custom MUI theme** to centralize palette + typography.
2. **i18n**: multiple TTS languages, word lists, and voices.
3. **Cloud save** (Supabase): enable cross-device progress sync.
4. **Performance**: code-split scenes; analyze bundle with `vite build --report`.
5. **Accessibility**: Add focus outlines, ARIA live regions for feedback.

---

_Keep this doc current whenever significant architectural or tooling changes are introduced._
