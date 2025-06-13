// File: src/components/ProgressTracker.tsx

import { FC, useMemo } from "react";
import badgesData from "@/data/badges.json";
import { useGameStore } from "@/services/gameState";
import { Alert, Box, Card, CardContent, Typography } from "@mui/material";
import ProgressBar from "./ProgressBar";
import Icon from "./Icon";

type Badge = (typeof badgesData)[number];

const ProgressTracker: FC = () => {
  // --- Global state selectors ---
  const {
    xp,
    level,
    xpToNextLevel,
    wordsMastered,
    collectedPokemonIds,
    earnedBadges,
  } = useGameStore((state) => ({
    xp: state.xp,
    level: state.level,
    xpToNextLevel: state.xpToNextLevel,
    wordsMastered: state.wordsMastered,
    collectedPokemonIds: state.collectedPokemonIds,
    earnedBadges: state.earnedBadges,
  }));

  // --- Memoized derived data ---
  const earnedBadgeList = useMemo<Badge[]>(
    () => badgesData.filter((b) => earnedBadges.includes(b.id)),
    [earnedBadges],
  );

  const { xpCurrent, xpTotal } = useMemo(() => {
    // Base XP per level is 100
    const baseXp = (level - 1) * 100;
    return {
      xpCurrent: xp - baseXp,
      xpTotal: xpToNextLevel - baseXp,
    };
  }, [xp, level, xpToNextLevel]);

  // Total Pokémon caught
  const pokemonCount = useMemo(
    () => collectedPokemonIds.length,
    [collectedPokemonIds],
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
        Progress Tracker
      </Typography>

      {/* Top Stats */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        {[
          { label: "Level", value: level },
          { label: "Total XP", value: xp },
          { label: "Words Mastered", value: wordsMastered },
          { label: "Pokémon", value: pokemonCount },
        ].map(({ label, value }) => (
          <Card
            key={label}
            sx={{
              textAlign: "center",
              flex: "1 1 calc(50% - 8px)",
              "@media (min-width:600px)": { flex: "1 1 calc(25% - 12px)" },
            }}
          >
            <CardContent>
              <Typography variant="overline">{label}</Typography>
              <Typography variant="h4">{value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* XP Progress */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Progress to Next Level
          </Typography>
          <ProgressBar current={xpCurrent} total={xpTotal} />
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Badges Earned
          </Typography>
          {earnedBadgeList.length === 0 ? (
            <Alert severity="info">
              No badges earned yet. Complete scenes to earn them!
            </Alert>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {earnedBadgeList.map((badge) => (
                <Box
                  key={badge.id}
                  role="group"
                  aria-label={badge.name}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    width: 120,
                  }}
                >
                  <Icon name={badge.icon} size={48} />
                  <Typography variant="caption" sx={{ mt: 1 }}>
                    {badge.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressTracker;

// TODO: Extract top-stats array mapping into a <StatCard> reusable component.
// TODO: Move base XP value (100) into a shared constant or import from gameState.
// TODO: Add unit tests for XP progression and badge rendering.
