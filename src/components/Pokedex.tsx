// Shows the Pokémon the player has collected so far.
import { useGameStore } from "@/services/gameState";
import allPokemonData from "@/data/pokedex.json";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import useBackgroundMusic from "@/hooks/useBackgroundMusic";
//
// Development Plan:
// - Add pagination or lazy loading for the Pokémon grid to maintain performance
//   when the collection grows large.
// - Include a search/filter field so players can quickly find specific Pokémon
//   by name or type.
// - Display additional stats such as capture date or scene of capture once that
//   data is tracked in the store.

// --- Background Music Setup ---
const musicTracks = [
  "/assets/sounds/bg_city.ogg",
  "/assets/sounds/bg_final.ogg",
  "/assets/sounds/bg_fire.ogg",
  "/assets/sounds/bg_forest.ogg",
  "/assets/sounds/bg_ice.ogg",
  "/assets/sounds/bg_storm.ogg",
];

const getRandomTrack = () =>
  musicTracks[Math.floor(Math.random() * musicTracks.length)];
// --- End Background Music Setup ---

// Display a grid of caught Pokémon
export default function Pokedex() {
  // Play a random background track when the Pokédex is viewed.
  useBackgroundMusic(getRandomTrack());

  // Get the list of IDs for Pokémon that have been caught from our global store
  const { collectedPokemonIds } = useGameStore();

  // Filter the master Pokédex to get data for only the Pokémon the player has caught
  const caughtPokemon = allPokemonData.filter((pokemon) =>
    collectedPokemonIds.includes(pokemon.id),
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
        Pokédex
      </Typography>

      {caughtPokemon.length === 0 ? (
        // No Pokémon have been caught yet
        <Alert severity="info">
          You haven't caught any Pokémon yet. Go spell some words!
        </Alert>
      ) : (
        // Show each caught Pokémon in a grid using Box with Flexbox
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {caughtPokemon.map((pokemon) => (
            <Box
              key={pokemon.id}
              sx={{
                width: {
                  xs: "calc(50% - 8px)", // 2 columns on extra-small screens
                  sm: "calc(33.333% - 11px)", // 3 columns on small
                  md: "calc(25% - 12px)", // 4 columns on medium
                  lg: "calc(16.666% - 14px)", // 6 columns on large
                },
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  sx={{ height: 140, objectFit: "contain", p: 2 }}
                  image={`/assets/images/pokemon/${String(
                    pokemon.id,
                  ).padStart(3, "0")}.png`}
                  alt={pokemon.name.english}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {pokemon.name.english}
                  </Typography>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    {pokemon.type.map((type) => (
                      <Chip key={type} label={type} size="small" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}