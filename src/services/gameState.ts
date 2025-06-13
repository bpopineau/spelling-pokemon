// File: src/services/gameState.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Constants
const LEVEL_UP_XP_BASE = 100;
const HINT_MAX = 2;

// State and actions interface
type GameState = {
  xp: number;
  level: number;
  xpToNextLevel: number;
  hintCharges: number;
  wordsMastered: number;
  collectedPokemonIds: number[];
  completedScenes: number[];
  earnedBadges: number[];

  addXp: (amount: number) => void;
  spendHint: () => void;
  incrementWordsMastered: () => void;
  catchPokemon: (pokemonId: number) => void;
  completeScene: (sceneId: number) => void;
};

// TODO: Split persistence middleware into separate layer for testability
// TODO: Extract leveling logic into helper functions

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Initial state
      xp: 0,
      level: 1,
      xpToNextLevel: LEVEL_UP_XP_BASE,
      hintCharges: HINT_MAX,
      wordsMastered: 0,
      collectedPokemonIds: [],
      completedScenes: [],
      earnedBadges: [],

      // Actions
      addXp: (amount) => {
        set((state) => {
          const totalXp = state.xp + amount;
          let newLevel = state.level;
          let newXpToNext = state.xpToNextLevel;

          if (totalXp >= state.xpToNextLevel) {
            newLevel += 1;
            newXpToNext = newLevel * LEVEL_UP_XP_BASE;
          }

          return { xp: totalXp, level: newLevel, xpToNextLevel: newXpToNext };
        });
      },

      spendHint: () => {
        set((state) => ({
          hintCharges: Math.max(0, state.hintCharges - 1),
        }));
      },

      incrementWordsMastered: () => {
        set((state) => {
          const count = state.wordsMastered + 1;
          const hints =
            count % 5 === 0 && state.hintCharges < HINT_MAX
              ? state.hintCharges + 1
              : state.hintCharges;
          return { wordsMastered: count, hintCharges: hints };
        });
      },

      catchPokemon: (pokemonId) => {
        set((state) => ({
          collectedPokemonIds: state.collectedPokemonIds.includes(pokemonId)
            ? state.collectedPokemonIds
            : [...state.collectedPokemonIds, pokemonId],
        }));
      },

      completeScene: (sceneId) => {
        set((state) => {
          const scenes = state.completedScenes.includes(sceneId)
            ? state.completedScenes
            : [...state.completedScenes, sceneId];
          const badges = state.earnedBadges.includes(sceneId)
            ? state.earnedBadges
            : [...state.earnedBadges, sceneId];
          return { completedScenes: scenes, earnedBadges: badges };
        });
      },
    }),
    { name: "game-state" },
  ),
);
