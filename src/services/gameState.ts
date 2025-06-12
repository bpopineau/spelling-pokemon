import { create } from 'zustand';

// Define the interface for our store's state and actions
export interface GameState {
    xp: number;
    level: number;
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
    hintCharges: 3,
    collectedPokemonIds: [],

    // Actions
    addXp: (amount) => {
        set((state) => ({ xp: state.xp + amount }));
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