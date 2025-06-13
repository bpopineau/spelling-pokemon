# 📘 Spelling Adventure – Game Design Specification

_(Expanded with Legend’s Shadow Locations & Lore — Updated 2025-06)_

---

## 1. Overview
**Spelling Adventure** is a Pokémon-inspired educational game for early readers (ages 5-7). Set in the rich world of **Shadowlight Isles**, players journey through mythical regions, mastering words, unlocking legendary trials, and restoring harmony to a realm disrupted by confusion and imbalance. The story draws from the allegorical universe of _Pokémon: Legend’s Shadow_ and adapts it into an interactive literacy adventure.

---

## 2. Gameplay Structure
### 2.1 Map Progression
* Hybrid flow
  * Starts with a **linear route** of themed regions (Glendor Grove → Sparkspire Zone …).
  * After **25 words mastered** the **Wild Wordlands** unlock, allowing free-play and access to Legendary Trials.
  * Later regions/trials unlock by XP and badge milestones.

### 2.2 World Map — Region Overview

| Region             | Lore Location       | Type         | Description                                   |
| ------------------ | ------------------- | ------------ | --------------------------------------------- |
| Glendor Grove      | Glendor Grove       | Starter Zone | Peaceful forest of discovery — first 10 words |
| Willowshade Woods  | Willowshade Woods   | Scene Zone   | Gentle phonics & digraph review               |
| Sparkspire Zone    | Sparkspire City     | Scene Zone   | Timed spelling challenges — urban visuals     |
| Glyphstone Ruins   | Josara Ridge        | Lore Scene   | Root-word & compound puzzles                  |
| Whispering Woods   | —                   | Replay Area  | Open practice (XP only)                       |
| Sandy Shoals       | Kalani Island       | Open Area    | Water-themed vocabulary                       |
| Ember Crag         | Obsidian Spire      | Open Area    | Harder words; volcanic visuals                |
| Sunnybrush Fields  | Goldenfields Plain  | Nature Scene | Animal / plant lexicon                        |
| Fable Fern Grotto  | Auragon Hollow      | Fairy Scene  | Rhymes & short poetic spelling                |

---

## 3. Legendary Trial Regions

| Trial Region        | Lore Reference   | Theme            | Legendary | Virtue Badge |
| ------------------- | ---------------- | ---------------- | --------- | ------------ |
| Crimson Cove        | Kalani Island    | Fire / Courage   | Moltres   | 🔥 Courage   |
| Mistveil Peaks      | Veilmist Summit  | Ice / Wisdom     | Articuno  | ❄️ Wisdom    |
| Stormvale Crater    | Sulfurion Basin  | Storm / Lead.    | Zapdos    | ⚡ Leadership |
| Wordway Path        | Trail of Ancients| Scenic Memory    | —         | —            |
| Thundertrail Cliffs | Stormcrag Peak   | Bonus Puzzle     | Zapdos    | —            |
| Sanctuary of Balance| Harmonic Temple  | Final Scene      | Trio      | 🏅 Balance   |

---

## 4. Scene Challenge Flow
1. **TTS** pronounces the word.
2. Word shown as blanks.
3. Player uses **on-screen QWERTY keyboard**.
4. Controls: ✅ Submit · ⌫ Backspace · 🔁 Repeat (unlimited) · ✨ Hint (if charges left).
5. Correct → Pokémon caught, XP gained.
6. Incorrect → friendly retry + hint prompt.

---

## 5. Hint System
* Start with **3 hint charges**.
* Each hint reveals the **next letter** (max 2 per word).
* +1 hint every **5 words mastered**.
* Button disabled when charges = 0.

---

## 6. Progression & Rewards
* **XP** per correct word; bonus for no-hint first-try.
* **Level-up** every 100 XP × current level.
* **Badges** at 10 / 25 / 50 words + each Virtue Trial.

---

## 7. Pokémon Collection
* Scene completion grants scene-themed Pokémon.
* Shiny Legendaries appear only in Trial cut-scenes.
* Pokédex shows collected Pokémon and % complete.

---

## 8. Progress Tracker (Menu → Progress)
* ✅ Words mastered
* 🔁 Attempts per word
* 🎓 XP & Level
* 🏅 Badges earned
* 🎒 Pokémon collected
* ⬇️ Backup progress to JSON

---

## 9. Characters (Legend’s Shadow)
| Character                 | Role in Game                                           |
| ------------------------- | ------------------------------------------------------ |
| **Jonah** (Player)        | Embodies growth and mastery through reading            |
| **Brandon** (Guide)       | Encouraging mentor at milestones                       |
| **Amanda** (Wordkeeper)   | Narrates lore before trials                            |
| **Allie** (Hint Spirit)   | Delivers hints & playful messages                      |
| **Giovanni** (The Shadow) | Embodiment of confusion; appears on repeated failures  |

---

## 10. Technical Stack _(Updated June 2025)_
| Layer           | Technology                                   |
| --------------- | -------------------------------------------- |
| Framework       | React 18 + Vite 5 (TypeScript 5)             |
| UI / Styling    | **MUI v5** (sx prop) + minimal CSS           |
| Fonts           | Roboto (MUI default)                         |
| State Mgmt      | Zustand (persisted to `localStorage`)        |
| TTS             | Web Speech API (`ttsService.ts`)             |
| Testing         | Vitest + @testing-library/react + happy-dom  |
| Linting         | ESLint v9 (flat) + Prettier                  |
| Build / Assets  | Vite static `/public/assets`                 |
| Hosting         | Static CDN / GitHub Pages / Raspberry Pi     |

---

## 11. Directory Structure (2025-06)

spelling-adventure/
├─ public/
│ └─ assets/ images / icons / sprites / sounds
├─ src/
│ ├─ components/ UI + game logic (GameMap, SceneView, etc.)
│ ├─ services/ gameState, ttsService
│ ├─ data/ words.json, scenes.json, pokemon.json …
│ ├─ lib/ utils.ts
│ └─ index.css global MUI reset
├─ scripts/ build_pokemon_json.py (scene assignments)
├─ tests/ vitest setup & unit tests
├─ vite.config.ts Vite + SVGR + ts-paths
└─ eslint.config.js ESLint v9 flat-config


---

## 12. Future Features
* ⚔️ Gym Spelling Battles (boss duels)
* 🛡️ Word Defense arcade mode
* ☁️ Cross-device sync (Supabase)
* 🗣️ Voice spelling input (WebSpeech)
* 🌈 Pokémon Evolution & cosmetic items

---

## 13. Final Notes
* Visuals tuned for **young readers**: high contrast, friendly typography, encouraging sounds.
* Legendary Trials reinforce virtues of a strong reader: **courage, wisdom, leadership**.
* Progress is 100 % offline-friendly; cloud sync is a future enhancement.
