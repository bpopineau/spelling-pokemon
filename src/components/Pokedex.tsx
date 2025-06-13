// File: src/components/Pokedex.tsx

import { FC, useMemo } from "react";
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

type Pokemon = (typeof allPokemonData)[number];

const Pokedex: FC = () => {
  // --- Global state selector ---
  const collectedPokemonIds = useGameStore(
    (state) => state.collectedPokemonIds,
  );

  // --- Memoized caught Pokémon data ---
  const caughtPokemon = useMemo<Pokemon[]>(
    () => allPokemonData.filter((p) => collectedPokemonIds.includes(p.id)),
    [collectedPokemonIds],
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
        Pokédex
      </Typography>

      {caughtPokemon.length === 0 ? (
        <Alert severity="info">
          You haven’t caught any Pokémon yet. Go spell some words!
        </Alert>
      ) : (
        <Box
          component="section"
          aria-label="Caught Pokémon"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {caughtPokemon.map((pokemon) => (
            <Card
              key={pokemon.id}
              sx={{
                width: {
                  xs: "calc(50% - 8px)",
                  sm: "calc(33.333% - 11px)",
                  md: "calc(25% - 12px)",
                  lg: "calc(16.666% - 14px)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={`/assets/images/pokemon/${String(pokemon.id).padStart(3, "0")}.png`}
                alt={pokemon.name.english}
                loading="lazy"
                sx={{ height: 140, objectFit: "contain", p: 2 }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {pokemon.name.english}
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center">
                  {pokemon.type.map((type) => (
                    <Chip key={type} label={type} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Pokedex;

// TODO: Extract the responsive card grid into a <PokédexGrid> component.
// TODO: Lazy-load images with React Suspense or an <Image> component.
// TODO: Add snapshot tests for empty and populated states.
// TODO: Consider adding Pokémon sorting/filter controls.
