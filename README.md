# 📘 Spelling Adventure

_Spelling Adventure_ is a Pokémon-inspired spelling game for early readers.
Built with **React 18 + TypeScript + Vite**, it blends phonics practice with region-based exploration, XP, badges, and a collectible Pokédex.

---

## ✨ Key Features

| Category   | Highlights                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gameplay   | • Region map with XP-gated scenes • TTS-driven spelling challenges • Limited hints & level-up rewards                                                                                      |
| Collection | • Catch Pokémon on correct answers • Pokédex gallery with sprites & types                                                                                                                  |
| Progress   | • XP / level tracker and badges • Persistent state (Zustand + localStorage)                                                                                                                |
| Tech Stack | • React 18 (FC/hooks) • Vite 5 build + React Fast-Refresh • **MUI v5** component library • Strict TypeScript, ESLint v9 (flat-config) & Prettier • Vitest + Testing-Library for unit tests |

---

## 🚀 Getting Started

$ npm ci # reproducible install
$ npm run dev # dev server at http://localhost:5173 with HMR

### Available NPM Scripts

| Script     | Description                                 |
| ---------- | ------------------------------------------- |
| dev        | Start Vite in development mode (HMR)        |
| build      | Produce a production build in dist/         |
| preview    | Serve the build locally                     |
| lint       | Run ESLint v9 with TypeScript + React rules |
| format     | Format code with Prettier                   |
| test       | Run Vitest unit tests once                  |
| test:watch | Run tests in watch mode                     |

---

## 🧪 Testing

• **Runner:** Vitest (Jest-compatible)
• **DOM utils:** @testing-library/react + jest-dom
• **Environment:** happy-dom (headless DOM)

Add tests in `src/**/__tests__/*.spec.ts(x)`.

---

## 🔍 Linting & Formatting

• **ESLint v9** flat-config (TypeScript strict, React, hooks, Prettier integration)
• **Prettier** for consistent formatting (`npm run format`)

---

## 🏗 Building for Production

$ npm run build # optimized output → dist/
$ npm run preview # preview build at http://localhost:4173

---

## 📂 Project Structure

spelling-adventure/
│─ public/ static assets
│ └─ assets/ images / sprites / icons / sounds
│─ src/
│ ├─ components/ React UI + game logic
│ ├─ services/ Zustand store & TTS helper
│ ├─ data/ JSON datasets (words, scenes, Pokémon…)
│ ├─ lib/ shared utilities
│ └─ index.css global styles (MUI-only)
│─ scripts/ build-time utilities
│─ vite.config.ts Vite + SVGR + ts-paths
└─ eslint.config.js ESLint flat config

---

## 🖼 Adding Assets

1. Place files under `public/assets/` following existing sub-folder naming (`images`, `icons`, `sounds`, `pokemon`, …).
2. Use **PNG** for raster, **SVG** for icons, **OGG/WAV** for audio.
3. Update `assets.md` to keep the inventory current.

---

## 📚 Further Documentation

| File                          | Description                           |
| ----------------------------- | ------------------------------------- |
| assets.md                     | Complete asset reference & specs      |
| game_design_specification.md  | Detailed gameplay flow & design       |
| DEVELOPMENT_NOTES.md          | Component/service overview & dev tips |
| scripts/build_pokemon_json.py | Regenerates Pokémon-scene assignments |

---

## 🤝 Contributing

1. Branch from `main`.
2. Run `npm run lint && npm run test` before pushing.
3. Provide clear commit messages and update docs/tests where relevant.

Happy spelling & catching! ✨
