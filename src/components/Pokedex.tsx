// Shows the Pokémon the player has collected so far
import { useGameStore } from '../services/gameState';
import allPokemonData from '../data/pokedex.json'; // The main data source for all Pokémon details

// Display a grid of caught Pokémon
export default function Pokedex() {
    // Get the list of IDs for Pokémon that have been caught from our global store
    const { collectedPokemonIds } = useGameStore();

    // Filter the main Pokémon list to get the full data for only the caught Pokémon
    const caughtPokemon = allPokemonData.filter(pokemon =>
        collectedPokemonIds.includes(pokemon.id)
    );

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Pokédex</h1>

            {caughtPokemon.length === 0 ? (
                <p className="text-center text-lg text-gray-500">You haven't caught any Pokémon yet. Go spell some words!</p>
            ) : (
                // Show each caught Pokémon in a grid
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {/* Each Pokémon gets its own card */}
                    {caughtPokemon.map(pokemon => (
                        <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105">
                            <img
                                src={`/assets/images/pokemon/${String(pokemon.id).padStart(3, '0')}.png`}
                                alt={pokemon.name.english}
                                className="w-24 h-24"
                            />
                            <h2 className="mt-2 text-lg font-bold text-gray-700 text-center">{pokemon.name.english}</h2>
                            <div className="flex flex-wrap justify-center gap-2 mt-1">
                                {pokemon.type.map(type => (
                                    <span key={type} className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}