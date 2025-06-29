# Development Notes

This file provides high-level guidance for developers working on the code base. Each section lists notes, todos and potential improvements for the corresponding file. Many of these suggestions now also appear inline in the code as `TODO` comments.

## Root configuration and documentation

### `README.md`
- Minimal README from Vite template. Could be expanded with game-specific instructions and build steps.

### `assets.md`
- Detailed asset inventory. Ensure this stays up to date when adding new images/audio.
- Consider splitting into smaller docs if asset count grows.

### `game_design_specification.md`
- Long design document describing gameplay. No immediate actions but good reference for features.

### `index.html`
- Only hosts the React root element. Simple and fine as is.
- TODO: Update `<title>` and icons to match the game name instead of "Vite + React + TS".

### `eslint.config.js`, `prettierrc.json`
- Provide linting and formatting rules. Keep in sync with team style preferences.

### `postcss.config.cjs`, `tailwind.config.js`
- Tailwind setup. No obvious issues. Review periodically with Tailwind upgrades.

### TypeScript configs (`tsconfig*.json`)
- Strict settings enabled. Ensure Node and browser builds stay compatible with these settings.

### `vite.config.ts`
- Very small. May need additional config (e.g. asset base path, plugins) as the project grows.

### `package.json`
- Contains standard dev scripts. A `test` script using `vitest` now runs unit tests with `npm test`.

## Source Code (`src`)

### `main.tsx`
- React entry point using `createRoot`. Implementation is straightforward.
- Potential improvement: error boundary or suspense fallback could be added here.

### `App.tsx`
- Defines routing only. Future screens should be added here.
- A NotFound route now handles unmatched URLs and redirects players back to the map.

### Components

#### `Header.tsx`
- Displays navigation links with active styles.
- Could extract link list to a constant for easier updates.

#### `MainLayout.tsx`
- Wraps pages with `Header`. Consider supporting optional footer later.

#### `GameMap.tsx`
- Renders map with clickable regions.
- Unlock logic uses XP stored in `scenes.json`.
- TODO: Add keyboard navigation/accessibility for the region buttons.

#### `SceneView.tsx`
- Loads scene by ID from the URL and displays `SpellingChallenge`.
- Uses inline styles for background image.
- TODO: Add error handling for missing background assets.

#### `SpellingChallenge.tsx`
- Core game logic. Uses Zustand store for XP, hints and Pokémon capture.
- Consider refactoring into smaller hooks for readability (input handling, progress calculations, etc.).
- Future improvement: replace magic numbers (e.g. XP per word) with constants or config.

#### `Controls.tsx`
- Presentational buttons only. No immediate concerns.

#### `OnScreenKeyboard.tsx`
- Simple on-screen keyboard. Could allow customizing layout via props if needed.

#### `Pokedex.tsx`
- Lists captured Pokémon.
- Could paginate or lazy load if number of Pokémon becomes large.

#### `ProgressTracker.tsx`
- Shows player stats and earned badges.
- Uses `ProgressBar` component to show XP progress.
- Added reset button allowing players to clear progress.

#### `ProgressBar.tsx`
- Generic progress bar. Could be reused in other screens.

### Assets (`src/assets`)
- Only contains `react.svg`. Actual game assets live in `public/` but are not committed here.

### Data files (`src/data`)
- JSON and TypeScript files containing game content (words, scenes, Pokémon, etc.).
- Keep these in sync with any scripts that generate them (see `scripts/` below).
- `regionHotspots.ts`: may need coordinate adjustments if map image changes.

### Services (`src/services`)

#### `gameState.ts`
- Zustand store managing XP, hints, Pokémon, etc.
- TODO: Consider splitting persistence logic from game actions for easier testing.
- Additional actions may be needed for future features (e.g. resetting progress).

#### `ttsService.ts`
- Wrapper around `SpeechSynthesis` API.
- Could allow selecting different voices or languages via options.

## Scripts

### `scripts/build_pokemon_json.py`
- Utility to assign Pokémon to scenes based on type. Only needed when updating `pokedex.json`.
- Ensure environment has Python 3 available when running.
- TODO: Add command-line options (input/output paths) for flexibility.

### `build_pronunciations.py`
- Generates `words_with_pronunciations.json` from a word list using the CMU Pronouncing Dictionary.
- Now accepts `--input` and `--output` arguments to specify file paths.

## Data (`public`)
- Currently only `vite.svg` committed. Actual game assets (images, audio) are referenced in docs but not included. Ensure asset paths match the deployed environment.

