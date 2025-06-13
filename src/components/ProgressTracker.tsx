// Shows the player's level, XP and earned badges.
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

export default function ProgressTracker() {
  // Pull various progress metrics from the central store
  const {
    xp,
    level,
    xpToNextLevel,
    wordsMastered,
    collectedPokemonIds,
    earnedBadges,
  } = useGameStore();

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