// Shows the Pokémon the player has collected so far.
//
// The component reads the IDs of caught Pokémon from the global game store and
// cross references them with the master Pokédex data to display full details
// (name, types and sprite) for each one.
// TODO: add pagination or lazy loading when the list grows large
import { useGameStore } from "../services/gameState";
import allPokemonData from "../data/pokedex.json"; // The main data source for all Pokémon details

// Display a grid of caught Pokémon
export default function Pokedex() {
  // Get the list of IDs for Pokémon that have been caught from our global store
  const { collectedPokemonIds } = useGameStore();

  // Filter the master Pokédex to get data for only the Pokémon the player has caught
  const caughtPokemon = allPokemonData.filter((pokemon) =>
    collectedPokemonIds.includes(pokemon.id),
  );

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Pokédex
      </h1>

      {caughtPokemon.length === 0 ? (
        // No Pokémon have been caught yet
        // TODO: Consider using shadcn/ui's Alert component here.
        // Example: <Alert><AlertTitle>No Pokémon Caught!</AlertTitle><AlertDescription>You haven't caught any Pokémon yet. Go spell some words!</AlertDescription></Alert>
        // See https://ui.shadcn.com/docs/components/alert
        <p className="text-center text-lg text-gray-500">
          You haven't caught any Pokémon yet. Go spell some words!
        </p>
      ) : (
        // Show each caught Pokémon in a grid
        // TODO: Consider using shadcn/ui's Card component for each Pokémon entry.
        // This would involve Card, CardHeader, CardTitle, CardContent, and potentially CardFooter.
        // See https://ui.shadcn.com/docs/components/card
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Each Pokémon gets its own card */}
          {caughtPokemon.map((pokemon) => (
            // TODO: Replace this div with <Card key={pokemon.id}>...</Card>
            <div
              key={pokemon.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105"
            >
              {/* TODO: Consider using shadcn/ui's AspectRatio component here to maintain consistent image dimensions.
                  Example: <AspectRatio ratio={1 / 1} className="bg-muted">
                             <img ... />
                           </AspectRatio>
                  See https://ui.shadcn.com/docs/components/aspect-ratio */}
              <img
                src={`/assets/images/pokemon/${String(pokemon.id).padStart(3, "0")}.png`}
                alt={pokemon.name.english}
                className="w-24 h-24"
              />
              {/* Pokémon artwork lives under `public/assets/images/pokemon/` as
                  documented in assets.md. Ensure the images are copied there
                  for these entries to display. */}
              {/* TODO: This could be <CardHeader><CardTitle>{pokemon.name.english}</CardTitle></CardHeader> */}
              <h2 className="mt-2 text-lg font-bold text-gray-700 text-center">
                {pokemon.name.english}
              </h2>
              {/* TODO: This section could be part of <CardContent> */}
              <div className="flex flex-wrap justify-center gap-2 mt-1">
                {pokemon.type.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold"
                  >
                    {type}
                  </span>
                ))}
              </div>
              {/* TODO: If there were actions, they could go in <CardFooter> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
