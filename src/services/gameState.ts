// Game state store using Zustand. It keeps track of XP, level and more.
//
// Zustand provides a minimal and lightweight state container similar to Redux
// but with a much simpler API. All persistent player progress is stored here so
// that any component can read or update it without prop drilling.
import { create } from "zustand";
import { persist } from "zustand/middleware";
//
// Development Plan:
// - Separate persistence (localStorage) from the gameplay logic so that the
//   store can be unit tested without hitting browser APIs.
// - Add selectors for derived data such as current level percentage to reduce
//   duplication in components.
// - Explore syncing this state to an optional backend in the future for
//   cross-device save support.
// - Document the entire state shape in DEVELOPMENT_NOTES.md so new features can
//   extend it confidently.
// - Provide example unit tests for reducers/actions so contributors understand
//   how to test store behavior.

// The base amount of XP needed to level up. Each new level multiplies this
// value so that higher levels require progressively more experience.
const LEVEL_UP_XP_BASE = 100;
const HINT_MAX = 2;

// Define the initial state to reuse it for the reset action
const initialState = {
  xp: 0,
  level: 1,
  xpToNextLevel: LEVEL_UP_XP_BASE,
  hintCharges: HINT_MAX,
  wordsMastered: 0,
  collectedPokemonIds: [],
  completedScenes: [],
  earnedBadges: [],
};

// Define the interface for our store's state and actions. This gives TypeScript
// knowledge of everything stored as well as the functions used to mutate the
// state.
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
  resetProgress: () => void; // Add reset to the interface
}
// TODO: split persistence logic out so game actions can be unit tested more easily

// Create the store with our initial state and actions. The `persist` middleware
// writes everything to `localStorage` so that progress isn't lost on refresh or
// page close.
export const useGameStore = create<GameState>()(
  // persist saves the store in localStorage so progress stays after refresh
  persist(
    (set) => ({
      ...initialState,

      // Increase the player's XP and handle level up logic.
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

      // Spend one hint charge if any are available.
      spendHint: () => {
        set((state) => {
          if (state.hintCharges > 0) {
            return { hintCharges: state.hintCharges - 1 };
          }
          return state;
        });
      },

      // Called whenever the player spells a word correctly.
      // Every 5 words mastered the player earns an extra hint charge.
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

      // Record that a Pokémon was caught in the current scene.
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

      // Mark a scene as completed and award the corresponding badge.
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

      // The new reset action. It sets the state back to the initial values.
      resetProgress: () => set(initialState),
    }),
    { name: "game-state" },
  ),
);

// --- For quick testing in the browser console ---
// Expose the store to the window object, but only in development mode.
if (import.meta.env.DEV) {
  // This makes it easy to inspect and tweak progress from the browser dev
  // console while building the game.
  (window as any).gameStore = useGameStore;
}