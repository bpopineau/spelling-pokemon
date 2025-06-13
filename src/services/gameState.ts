import { create } from "zustand";
import { persist } from "zustand/middleware";

// The base amount of XP needed to level up
const LEVEL_UP_XP_BASE = 100;
const HINT_MAX = 2;

// Define the interface for our store's state and actions
export interface GameState {
  xp: number;
  level: number;
  xpToNextLevel: number;
  hintCharges: number;
  wordsMastered: number;
  collectedPokemonIds: number[];
  completedScenes: number[];
  earnedBadges: number[];
  addXp: (amount: number) => void;
  spendHint: () => void; // Renamed from useHint
  incrementWordsMastered: () => void;
  catchPokemon: (pokemonId: number) => void;
  completeScene: (sceneId: number) => void;
}

// Create the store with our initial state and actions
export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Initial State
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
          const newXp = state.xp + amount;
          let newLevel = state.level;
          let newXpToNextLevel = state.xpToNextLevel;

          // Check for level up
          if (newXp >= state.xpToNextLevel) {
            newLevel++;
            // The XP needed for the next level increases
            newXpToNextLevel = newLevel * LEVEL_UP_XP_BASE;
          }

          return {
            xp: newXp,
            level: newLevel,
            xpToNextLevel: newXpToNextLevel,
          };
        });
      },

      spendHint: () => {
        set((state) => {
          if (state.hintCharges > 0) {
            return { hintCharges: state.hintCharges - 1 };
          }
          return state;
        });
      },

      incrementWordsMastered: () => {
        set((state) => {
          const newCount = state.wordsMastered + 1;
          let newHints = state.hintCharges;
          if (newCount % 5 === 0 && newHints < HINT_MAX) {
            newHints += 1;
          }
          return { wordsMastered: newCount, hintCharges: newHints };
        });
      },

      catchPokemon: (pokemonId) => {
        set((state) => {
          // Prevent adding duplicate Pokémon IDs
          if (!state.collectedPokemonIds.includes(pokemonId)) {
            return {
              collectedPokemonIds: [...state.collectedPokemonIds, pokemonId],
            };
          }
          return state;
        });
      },

      completeScene: (sceneId) => {
        set((state) => {
          if (!state.completedScenes.includes(sceneId)) {
            return {
              completedScenes: [...state.completedScenes, sceneId],
              earnedBadges: [...state.earnedBadges, sceneId],
            };
          }
          return state;
        });
      },
    }),
    { name: "game-state" },
  ),
);
