// File: src/components/GameMap.tsx

import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import regionHotspots from '@/data/regionHotspots';
import scenesData from '@/data/scenes.json';
import { useGameStore } from '@/services/gameState';
import { Box, Tooltip, Paper } from '@mui/material';

// Derive the hotspot item type directly from the data
type RegionHotspot = typeof regionHotspots[number];

// Type describing scene unlock requirements
interface SceneUnlock {
  id: number;
  unlock_xp: number;
}

// Path to the world map image asset
const MAP_SRC = '/assets/images/map/world-map.png';

/**
 * GameMap Component
 *
 * Renders the interactive world map with clickable regions.
 * Regions become available based on player XP (from global state).
 */
const GameMap: FC = () => {
  const navigate = useNavigate();
  const xp = useGameStore((state) => state.xp);

  // Memoize scene unlock data and compute unlocked scene IDs
  const scenes = useMemo<SceneUnlock[]>(() => scenesData as SceneUnlock[], []);
  const unlockedSceneIds = useMemo<Set<number>>(
    () => new Set(scenes.filter((s) => xp >= s.unlock_xp).map((s) => s.id)),
    [xp, scenes]
  );

  /** Navigate to the spelling challenge for a given scene */
  const handleRegionClick = (sceneId: number) => {
    if (unlockedSceneIds.has(sceneId)) {
      navigate(`/scene/${sceneId}`);
    }
  };

  return (
    <Box
      component="section"
      aria-label="World Map"
      sx={{
        minHeight: 'calc(100vh - 96px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, md: 4 },
        bgcolor: 'grey.100',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          position: 'relative',
          maxWidth: '75rem',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <Box
          component="img"
          src={MAP_SRC}
          alt="World Map"
          loading="lazy"
          sx={{ width: '100%', height: 'auto' }}
        />

        {regionHotspots.map((region: RegionHotspot) => {
          const unlocked = unlockedSceneIds.has(region.sceneId);
          return (
            <Tooltip title={region.name} key={region.id} arrow>
              <Box
                role="button"
                tabIndex={0}
                aria-disabled={!unlocked}
                onClick={() => handleRegionClick(region.sceneId)}
                onKeyDown={(e) => {
                  if (unlocked && (e.key === 'Enter' || e.key === ' ')) {
                    handleRegionClick(region.sceneId);
                  }
                }}
                sx={{
                  ...region.style,
                  position: 'absolute',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  '&:hover': {
                    backgroundColor: unlocked
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                  },
                  outline: 'none',
                }}
              />
            </Tooltip>
          );
        })}
      </Paper>
    </Box>
  );
};

export default GameMap;

// TODO: Extract scene-unlock logic into `useSceneUnlocks` hook
// TODO: Move hotspot style objects into theme or styled-components
// TODO: Add an error boundary for missing map asset
// TODO: Refine focus and hover states for accessibility
