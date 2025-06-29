/**
 * ---------------------------------------------------------------------------
 * GameMap Component (src/components/GameMap.tsx)
 * ---------------------------------------------------------------------------
 * The world map acts as the central hub of the game. Each region is represented
 * by an invisible clickable hotspot positioned over the map graphic. Regions
 * unlock as the player gains XP which encourages a sense of progression.
 *
 * The map image itself lives under `public/assets/images/map/world-map.png`.
 * Designers can swap out that file without touching the React code as long as
 * the hotspot coordinates remain valid. All hotspot coordinates are maintained
 * in `src/data/regionHotspots.ts`, so layout tweaks are a simple data change.
 *
 * This component purposely avoids local state and instead reads from the global
 * `gameState` store so that any scene can influence progression. Rendering is
 * handled with Material UI components for flexibility.
 */
import { useNavigate } from "react-router-dom"; // used to change screens
import { useRef } from "react";
//
// Development Plan:
// - Add keyboard/focus navigation so players can move between regions using the
//   arrow keys. This will also improve accessibility for screen reader users.
// - Investigate lazy-loading map graphics for future alternative maps (e.g.,
//   special events) without bloating the initial bundle.
// - Consider showing brief tooltips or previews when hovering a locked region
//   to hint at upcoming content.
// - Document the coordinate system for hotspots in regionHotspots.ts so team
//   members can tweak map positions without guesswork.
// - Add unit tests that verify locked/unlocked state logic to prevent
//   regressions in progression rules.
// Coordinates for each clickable region are defined in `regionHotspots.ts`.
// Editing that file allows designers to tweak the layout without touching
// component logic.
import regionHotspots from "@/data/regionHotspots"; // clickable map spots
import scenesData from "@/data/scenes.json"; // data about when scenes unlock
import { isSceneUnlocked } from "@/utils/progression";
import { useGameStore } from "@/services/gameState";
import { Box, Tooltip, Paper } from "@mui/material";
import useBackgroundMusic from "@/hooks/useBackgroundMusic";

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

// A lightweight type describing the shape of the scene unlock data so TypeScript
// can help us catch mismatches with the JSON file.
interface SceneUnlock {
  id: number;
  unlock_xp: number;
}

export default function GameMap() {
  // Router navigation function used to change the URL programmatically
  const navigate = useNavigate();

  // References to hotspot elements so keyboard navigation can move focus
  const regionRefs = useRef<(HTMLElement | null)[]>([]);

  // Play a random background track.
  useBackgroundMusic(getRandomTrack());

  // Pull the current XP value from the global store so we know which regions
  // should be available.
  const { xp } = useGameStore();

  // Navigate to the scene page when a region hotspot is clicked.
  const handleRegionClick = (sceneId: number) => {
    navigate(`/scene/${sceneId}`);
  };

  // Handle keyboard input for focused hotspots
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number,
    sceneId: number,
    unlocked: boolean,
  ) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    switch (e.key) {
      case "Enter":
      case " ":
        if (unlocked) handleRegionClick(sceneId);
        break;
      case "ArrowRight": {
        const next = col === 2 ? index : index + 1;
        regionRefs.current[next]?.focus();
        break;
      }
      case "ArrowLeft": {
        const prev = col === 0 ? index : index - 1;
        regionRefs.current[prev]?.focus();
        break;
      }
      case "ArrowUp": {
        const up = row === 0 ? index : index - 3;
        regionRefs.current[up]?.focus();
        break;
      }
      case "ArrowDown": {
        const down = row === 2 ? index : index + 3;
        regionRefs.current[down]?.focus();
        break;
      }
    }
  };

  // Determine whether a scene is unlocked using the helper from
  // `src/utils/progression.ts` so the logic can be unit tested.
  const isUnlocked = (sceneId: number) =>
    isSceneUnlocked(scenesData as SceneUnlock[], sceneId, xp);

  return (
    // The main container holds the map image and the invisible buttons
    <Box
      sx={{
        minHeight: "calc(100vh - 96px)", // Adjust for header height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, md: 4 },
        bgcolor: "grey.100",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          position: "relative",
          maxWidth: "75rem",
          overflow: "hidden",
          lineHeight: 0, // Removes extra space below the img
        }}
      >
        <img
          src="/assets/images/map/world-map.png"
          alt="World Map"
          style={{ width: "100%", height: "auto" }}
        />
        {/* The world map graphic should be placed at
            `public/assets/images/map/world-map.png` as noted in docs/assets.md. */}

        {/*
          Render an invisible clickable box for each region. The hotspot
          coordinates come from `regionHotspots.ts` which makes tweaking the map
          layout a data-only change.
        */}
        {regionHotspots.map((region, index) => {
          const unlocked = isUnlocked(region.sceneId);
          return (
            <Tooltip title={region.name} key={region.id} arrow>
              <Box
                ref={(el) => {
                  regionRefs.current[index] = el as HTMLElement | null;
                }}
                tabIndex={unlocked ? 0 : -1}
                role="button"
                aria-label={region.name}
                style={region.style}
                onClick={() => unlocked && handleRegionClick(region.sceneId)}
                onKeyDown={(e) => handleKeyDown(e, index, region.sceneId, unlocked)}
                sx={{
                  position: "absolute",
                  outline: "none",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  "&:hover": {
                    backgroundColor: unlocked
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  },
                  "&:focus-visible": {
                    boxShadow: "0 0 0 2px #1976d2",
                  },
                }}
              />
            </Tooltip>
          );
        })}
      </Paper>
    </Box>
  );
}