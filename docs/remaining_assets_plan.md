# Remaining Assets Integration Plan

This document outlines a strategy to integrate the currently deferred assets listed in [assets.md](./assets.md) into **Spelling Adventure**. The goal is to enhance gameplay and maintain accessibility for young learners.

## Character Sprites
- **Scope**: Pixel art sprites for Brandon, Amanda, Allie, and other supporting characters.
- **Plan**:
  - Expand `public/assets/images/sprites/` with new sprite sheets.
  - Update scene metadata in `pokedex-data/scenes.json` to associate each character with their region.
  - Implement simple walking animations (2-3 frames) for cutscenes and world map interactions.
  - Reuse existing sprite component logic to keep performance high.

## Alternate Pokémon Forms
- **Scope**: Special variants and legendary Pokémon art.
- **Plan**:
  - Add new images under `public/assets/images/pokemon/forms/` with unique IDs.
  - Extend `pokedex-data/pokemon.json` with form references and unlock conditions.
  - Use forms as rewards for optional challenges so core progression remains consistent.

## Animated UI Elements
- **Scope**: Enhanced buttons, transitions, and cutscene graphics.
- **Plan**:
  - Introduce subtle animations (CSS or lightweight sprite sheets) for feedback effects such as button hover or score popups.
  - Load cutscene backgrounds from `public/assets/images/backgrounds/cutscenes/` to give narrative moments more impact.
  - Keep accessibility high by respecting reduced motion preferences.

## Expanded Audio Library
- **Scope**: Additional region music tracks and unique sound effects.
- **Plan**:
  - Place new OGG files in `public/assets/sounds/` and reference them in `scenes.json`.
  - Provide alternate tracks for day/night cycles and boss encounters.
  - Offer a volume slider and mute toggle in `settings.json` so players can adjust sound easily.

## Advanced Accessibility Options
- **Scope**: Features such as dyslexic-friendly fonts or colorblind modes.
- **Plan**:
  - Create user preferences in `settings.json` with toggles for font choice and high-contrast mode.
  - Implement CSS classes to switch fonts and color palettes based on the selected mode.
  - Document accessibility settings in the README to help parents configure them.

## Parent/Teacher Portal and Profiles
- **Scope**: Tools for monitoring progress and customizing practice sets.
- **Plan**:
  - Expand the user profile data model to store progress history for multiple learners.
  - Provide a secure login for adults to view reports and assign bonus words.
  - Keep the initial implementation minimal, focusing on reading progress and badge tracking.

---

This plan prioritizes assets that directly improve the learning experience while keeping the game lightweight. Each addition should be paired with updates to `assets.md` and related JSON data files to maintain a single source of truth.
