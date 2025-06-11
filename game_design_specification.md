# 📘 Spelling Adventure – Game Design Specification
*(Expanded with Legend’s Shadow Locations & Lore)*

---

## 1. Overview

**Spelling Adventure** is a Pokémon-inspired educational game for early readers (ages 5–7). Set in the rich world of **Shadowlight Isles**, players journey through mythical regions, mastering words, unlocking legendary trials, and restoring harmony to a realm disrupted by confusion and imbalance. The story draws from the deep allegorical world of *Pokémon: Legend’s Shadow* and adapts it into a fun, interactive literacy adventure.

---

## 2. Gameplay Structure

### 2.1. Map Progression

- **Hybrid model**:
  - Begins with a **linear series** of scenes tied to themed regions (Glendor Grove, Sparkspire Zone, etc.).
  - After mastering **25 words**, the **Wild Wordlands** open, offering free-play and Legendary Trials.
  - Later regions and trials unlock based on XP and badge milestones.

### 2.2. World Map – Region Overview

| Region               | Origin Lore Location   | Type             | Description |
|----------------------|------------------------|------------------|-------------|
| Glendor Grove         | Glendor Grove          | Starter Zone     | Peaceful forest of discovery. First 10 words. |
| Willowshade Woods     | Willowshade Woods      | Scene Zone       | Gentle phonics and digraph review. |
| Sparkspire Zone       | Sparkspire City        | Scene Zone       | Fast-paced timed spelling. Urban-themed. |
| Glyphstone Ruins      | Josara Ridge           | Lore Scene       | Root words, compound word puzzles. |
| Whispering Woods      | –                      | Replay Area      | Open practice zone. XP only. |
| Sandy Shoals          | Kalani Island          | Open Area        | Water-themed scene with fun words. |
| Ember Crag            | Obsidian Spire         | Open Area        | Harder words; volcanic visuals. |
| Sunnybrush Fields     | Goldenfields Prairie   | Nature Scene     | Animal, plant, and nature vocabulary. |
| Fable Fern Grotto     | Auragon Hollow         | Fairy Scene      | Rhymes and short poetic spelling. |

---

## 3. Legendary Trial Regions

These regions are unlocked as part of the deeper arc:

| Trial Region      | Lore Reference     | Theme         | Legendary | Focus Trait |
|------------------|--------------------|---------------|-----------|--------------|
| Crimson Cove      | Kalani Island      | Fire/Courage  | Moltres   | Perseverance |
| Mistveil Peaks     | Veilmist Summit    | Ice/Wisdom    | Articuno  | Discernment  |
| Stormvale Crater   | Sulfurion Basin    | Storm/Leadership | Zapdos | Guidance     |
| Wordway Path       | Trail of Ancients  | Scenic Memory | –         | Reflection   |
| Thundertrail Cliffs | Stormcrag Peaks   | Bonus Puzzle  | Zapdos    | Final bonus |
| Sanctuary of Balance | Harmonic Temple | Final Scene   | Trio      | Restoration  |

---

## 4. Scene Challenge Flow

Each word challenge follows this loop:

1. **TTS speaks the word**: “Your word is tent.”
2. Word appears as blanks: `_ _ _ _`
3. Child uses **on-screen QWERTY keyboard** to input letters.
4. Available controls:
   - ✅ **Submit**
   - ⌫ **Backspace**
   - 🔁 **Repeat Word** (unlimited)
   - ✨ **Hint** (if charges remain)
5. Correct:
   - Pokémon is caught
   - XP is gained
6. Incorrect:
   - Friendly retry prompt
   - Hint option appears

---

## 5. Hint System

- Up to **2 hints** per word
- Each hint reveals the **next correct letter**
- Start with **3 hint charges**
- Earn +1 hint every **5 new words mastered**
- Hint button is disabled if out of charges

---

## 6. Progression & Rewards

### 6.1. XP & Leveling
- Earn XP per correct word
- Bonus XP: no hints, first-try correct
- XP gates unlock Trials and harder zones

### 6.2. Badges
- Earned at word mastery milestones (10, 25, 50)
- Completing a Legendary Trial grants a **Virtue Badge**:
  - 🔥 Courage – Moltres
  - ❄️ Wisdom – Articuno
  - ⚡ Leadership – Zapdos

---

## 7. Pokémon Collection

- Pokémon earned by completing scenes
- Shiny Legendary Pokémon appear only in Trial success cutscenes
- Pokedex shows caught Pokémon, notifies when full

---

## 8. Progress Tracker

Accessible anytime via Menu:
- ✅ Words mastered
- 🔁 Attempts per word
- 🎓 XP and Level
- 🏅 Badges earned
- 🎒 Pokémon collected
- 💎 Lexicon Crystal glow status
- ⬇️ Backup to `.json`

---

## 9. Characters (from Legend's Shadow)

| Character | Role in Game |
|----------|---------------|
| **Jonah** (Player) | Embodies growth and mastery through reading |
| **Brandon** (The Guide) | Appears at milestones, teaches encouragement |
| **Amanda** (Wordkeeper) | Narrates stories, introduces lore before trials |
| **Allie** (Hint Spirit) | Delivers hints and playful messages |
| **Giovanni** (The Shadow) | Symbol of confusion; appears when progress halts or hints are misused |

---

## 10. Technical Stack

| Layer           | Technology                             |
|----------------|----------------------------------------|
| Framework        | React + Vite (TypeScript)              |
| UI/Styling       | Tailwind CSS + shadcn/ui               |
| Font             | Fredoka (Google Fonts)                 |
| State Mgmt       | Local state + optional Zustand         |
| Text-to-Speech   | Web Speech API                         |
| Storage (MVP)    | `localStorage` only                    |
| Assets           | Static images/audio in `/public`       |
| Hosting          | Raspberry Pi static server (LAN)       |

---

## 11. Directory Structure (Updated for Story Content)

spelling-adventure/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── pokemon/
│       │   ├── icons/
│       │   └── backgrounds/
│       └── audio/
├── src/
│   ├── components/
│   │   ├── App.tsx
│   │   ├── GameMap.tsx
│   │   ├── SceneView.tsx
│   │   ├── Pokedex.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── Keyboard.tsx
│   │   └── Controls.tsx
│   ├── services/
│   │   ├── sceneManager.ts
│   │   ├── gameState.ts
│   │   ├── ttsService.ts
│   │   └── hintManager.ts
│   ├── data/
│   │   ├── words.json
│   │   ├── scenes.json
│   │   ├── pokemon.json
│   │   └── legend_trials.json
│   ├── constants.ts
│   └── index.tsx

---

## 12. Future Features

- ⚔️ Gym Spelling Battles (boss-style duels)
- 🛡️ Word Defense Mode (shield correct word)
- ☁️ Cross-device play (Supabase)
- 🗣️ Voice spelling (via WebSpeech input)
- 🌈 Pokémon Evolution & Customization

---

## 13. Final Notes

- Visuals and sounds designed for **young readers**:
  - Bright contrast UI
  - Clean font (Fredoka)
  - Encouraging sound design
- Story deeply integrated with *Pokémon: Legend’s Shadow* values:
  - Trials represent spiritual growth through literacy
  - Legendary birds symbolize virtues of a strong reader: courage, wisdom, leadership
