import { create } from 'zustand';

// The base amount of XP needed to level up
const LEVEL_UP_XP_BASE = 100;

// Define the interface for our store's state and actions
export interface GameState {
  xp: number;
  level: number;
  xpToNextLevel: number;
  hintCharges: number;
  collectedPokemonIds: number[];
  addXp: (amount: number) => void;
  spendHint: () => void; // Renamed from useHint
  catchPokemon: (pokemonId: number) => void;
}

// Create the store with our initial state and actions
export const useGameStore = create<GameState>((set) => ({
  // Initial State
  xp: 0,
  level: 1,
  xpToNextLevel: LEVEL_UP_XP_BASE,
  hintCharges: 3,
  collectedPokemonIds: [],

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

  spendHint: () => { // Renamed from useHint
    set((state) => {
      if (state.hintCharges > 0) {
        return { hintCharges: state.hintCharges - 1 };
      }
      return state;
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
}));