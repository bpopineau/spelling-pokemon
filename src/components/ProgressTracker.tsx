// ---------------------------------------------------------------------------
// ProgressTracker Component (src/components/ProgressTracker.tsx)
// ---------------------------------------------------------------------------
// Displays an overview of the player's accomplishments including level, XP and
// badges. Badge data is pulled from `badges.json` so that designers can add new
// rewards without modifying the React code. This screen is meant to be a central
// hub for progress related features such as exporting saves or viewing high
// level stats.
import badges from "@/data/badges.json";
import { useGameStore } from "@/services/gameState";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ProgressBar from "./ProgressBar";
import Icon from "@/components/Icon"; // Corrected import path
import useBackgroundMusic from "@/hooks/useBackgroundMusic";
//
// Development Plan:
// - Integrate the same `ProgressBar` component in other places (e.g., scene
//   results screens) for a consistent look.
// - When achievements beyond badges are introduced, expand this screen to show
//   them in a dedicated section.
// - Provide a reset-progress button that calls `resetProgress()` from the game
//   store (with confirmation) for parental control.
// - Add export/import of progress data via JSON to make backups simple.
// - Document badge requirements and XP formulas in README.md so progression
//   tweaks can be made without searching through code.

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

export default function ProgressTracker() {
  // Play a random background track.
  useBackgroundMusic(getRandomTrack());

  // Pull various progress metrics from the central store
  const {
    xp,
    level,
    xpToNextLevel,
    wordsMastered,
    collectedPokemonIds,
    earnedBadges,
  } = useGameStore(); // Zustand store keeps progress persisted across sessions

  // Filter for earned badges
  const earned = badges.filter((b) => earnedBadges.includes(b.id));

  // Calculate XP progress for the current level
  const xpForLastLevel = (level - 1) * 100;
  const xpGainedThisLevel = xp - xpForLastLevel;
  const xpNeededForThisLevel = xpToNextLevel - xpForLastLevel;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '900px', mx: 'auto' }}>
      <Typography variant="h3" component="h1" align="center" sx={{ mb: 4 }}>
        Progress Tracker
      </Typography>

      {/* Main Stats Grid using Box and Flexbox */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' } }}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="overline">Level</Typography>
              <Typography variant="h4">{level}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' } }}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="overline">Total XP</Typography>
              <Typography variant="h4">{xp}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' } }}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="overline">Words Mastered</Typography>
              <Typography variant="h4">{wordsMastered}</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 1, flexBasis: { xs: 'calc(50% - 8px)', sm: 'calc(25% - 12px)' } }}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Typography variant="overline">Pokémon</Typography>
              <Typography variant="h4">{collectedPokemonIds.length}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* XP Progress Card */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>Progress to Next Level</Typography>
          <ProgressBar
            current={xpGainedThisLevel}
            total={xpNeededForThisLevel}
          />
        </CardContent>
      </Card>

      {/* Badges Card */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>Badges Earned</Typography>
          {earned.length === 0 ? (
            <Alert severity="info">
              No badges earned yet. Complete scenes to earn them!
            </Alert>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {earned.map((badge) => (
                <Box
                  key={badge.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    width: 120,
                  }}
                >
                  <Icon name={badge.icon} className="w-16 h-16" />
                  <Typography variant="caption" sx={{ mt: 1 }}>{badge.name}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}