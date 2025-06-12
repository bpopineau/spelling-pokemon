import { create } from 'zustand';

// Helper function to calculate XP needed for the next level
const calculateXpForNextLevel = (level: number) => Math.floor(100 * Math.pow(level, 1.5));

// Define the interface for our store's state and actions
export interface GameState {
  xp: number;
  level: number;
  xpForNextLevel: number;
  hintCharges: number;
  collectedPokemonIds: number[];
  addXp: (amount: number) => void;
  useHint: () => void;
  catchPokemon: (pokemonId: number) => void;
}

// Create the store with our initial state and actions
export const useGameStore = create<GameState>((set) => ({
  // Initial State
  xp: 0,
  level: 1,
  xpForNextLevel: calculateXpForNextLevel(1), // XP needed to reach level 2
  hintCharges: 3,
  collectedPokemonIds: [],

  // Actions
  addXp: (amount) => {
    set((state) => {
      let newXp = state.xp + amount;
      let newLevel = state.level;
      let xpForNext = state.xpForNextLevel;

      // Use a while loop to handle multiple level-ups at once
      while (newXp >= xpForNext) {
        newLevel++;
        newXp -= xpForNext;
        xpForNext = calculateXpForNextLevel(newLevel);
      }

      return {
        xp: newXp,
        level: newLevel,
        xpForNextLevel: xpForNext,
      };
    });
  },

  useHint: () => {
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
        return { collectedPokemonIds: [...state.collectedPokemonIds, pokemonId] };
      }
      return state;
    });
  },
}));