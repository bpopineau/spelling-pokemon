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
import regionHotspots from "@/data/regionHotspots"; // clickable map spots
import scenesData from "@/data/scenes.json"; // data about when scenes unlock
import { useGameStore } from "@/services/gameState";
import { Box, Tooltip, Paper } from "@mui/material";

// A lightweight type describing the shape of the scene unlock data so TypeScript
// can help us catch mismatches with the JSON file.
interface SceneUnlock {
  id: number;
  unlock_xp: number;
}

export default function GameMap() {
  // Router navigation function used to change the URL programmatically
  const navigate = useNavigate();

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