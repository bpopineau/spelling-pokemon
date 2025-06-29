/**
 * GameMap Component
 *
 * Displays the large interactive map that acts as the hub for all scenes. Each
 * region on the map is represented by a transparent button positioned over the
 * background image. A region becomes clickable when the player has earned
 * enough XP. Clicking a region navigates to the spelling challenge for that
 * area. This component is intentionally stateless and simply reads from the
 * global game store to know which regions should be unlocked.
 */
import { useNavigate } from "react-router-dom"; // used to change screens
// Coordinates for each clickable region are defined in `regionHotspots.ts`.
// Editing that file allows designers to tweak the layout without touching
// component logic.
import regionHotspots from "@/data/regionHotspots"; // clickable map spots
import scenesData from "@/data/scenes.json"; // data about when scenes unlock
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

  // Play a random background track.
  useBackgroundMusic(getRandomTrack());

  // Pull the current XP value from the global store so we know which regions
  // should be available.
  const { xp } = useGameStore();

  // Navigate to the scene page when a region hotspot is clicked.
  const handleRegionClick = (sceneId: number) => {
    navigate(`/scene/${sceneId}`);
  };

  // Determine whether a scene is unlocked by comparing the player's XP to the
  // `unlock_xp` value from the scenes data.
  const isUnlocked = (sceneId: number) => {
    const scenes = scenesData as SceneUnlock[];
    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene) return false;
    // Scenes list the XP threshold required to play them. The comparison is
    // kept simple so changes to the progression curve only require editing the
    // JSON data, not this component.
    return xp >= scene.unlock_xp;
  };

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
            `public/assets/images/map/world-map.png` as noted in assets.md. */}

        {/*
          Render an invisible clickable box for each region. The hotspot
          coordinates come from `regionHotspots.ts` which makes tweaking the map
          layout a data-only change.
        */}
        {regionHotspots.map((region) => {
          const unlocked = isUnlocked(region.sceneId);
          return (
            <Tooltip title={region.name} key={region.id} arrow>
              <Box
                style={region.style}
                onClick={() => unlocked && handleRegionClick(region.sceneId)}
                sx={{
                  position: "absolute",
                  cursor: unlocked ? "pointer" : "not-allowed",
                  "&:hover": {
                    backgroundColor: unlocked
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
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