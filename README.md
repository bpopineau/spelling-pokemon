# Spelling Adventure

Spelling Adventure is a Pokémon‑inspired spelling game for early readers. The app is built with React, TypeScript and Vite and teaches vocabulary through region‑based challenges.

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

## Adding Assets

Game images, sounds and data files live under `public/assets`. When adding new assets:

1. Follow the folder and naming conventions listed in [`assets.md`](./assets.md).
2. Use the recommended formats (PNG for images, SVG for icons, WAV/OGG for audio).
3. Update `assets.md` to keep the inventory current.

Keeping the asset list up to date helps others find files quickly and prevents missing resources at build time.

## Further Documentation

- [`assets.md`](./assets.md) – complete asset reference
- [`game_design_specification.md`](./game_design_specification.md) – gameplay overview and design details
