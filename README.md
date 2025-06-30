# Spelling Adventure

Spelling Adventure is a Pokémon‑inspired spelling game for early readers. The app is built with React, TypeScript and Vite and teaches vocabulary through region‑based challenges.
For a list of design documents and development notes, see [docs/README.md](./docs/README.md).


## Getting Started

Install dependencies and launch the development server in one step:

```bash
npm install && npm run dev
```

This runs Vite in development mode with hot reloading. Visit the printed URL (usually `http://localhost:5173`) to try the game locally.

## Building for Production

Create an optimized build with:

```bash
npm run build
```

The output is placed in the `dist/` directory. You can preview the build using `npm run preview`.

## Running Tests

Unit tests are written with [Vitest](https://vitest.dev/). Run all tests with:

```bash
npx vitest run
```

Install Python dependencies for the pronunciation script:

```bash
pip install -r requirements.txt
```

## Generating Pronunciation Data

If you update the word list, run `build_pronunciations.py` to generate
`words_with_pronunciations.json`:

```bash
python build_pronunciations.py --input src/data/words.json --output src/data/words_with_pronunciations.json
```

The script now accepts `--input` and `--output` flags so custom word lists can
be processed easily.

## Resetting Progress

Visit the **Progress Tracker** page (`/progress`) to view your badges and stats.
You can reset all progress using the **Reset Progress** button at the bottom of
the page. This will clear collected Pokémon and XP.

## Adding Assets

Game images, sounds and data files live under `public/assets`. When adding new assets:

1. Follow the folder and naming conventions listed in [`assets.md`](./assets.md).
2. Use the recommended formats (PNG for images, SVG for icons, WAV/OGG for audio).
3. Update `assets.md` to keep the inventory current.

The site favicon now uses `pokeball_icon.svg` from the `public/assets/icons`
directory to match the game's theme.

Keeping the asset list up to date helps others find files quickly and prevents missing resources at build time.

## Navigation & Routes

The game uses React Router for in-app navigation. The primary routes are:

- `/` – world map where scenes can be selected
- `/pokedex` – view the list of caught Pokémon
- `/progress` – see player stats and earned badges
- `/scene/:sceneId` – play the spelling challenge for a given scene
- `*` – any unknown URL shows a friendly 404 page with a link back to the map

The world map hotspots support arrow-key navigation in addition to mouse or touch.

## Further Documentation

- [`assets.md`](./assets.md) – complete asset reference
- [`game_design_specification.md`](./game_design_specification.md) – gameplay overview and design details
