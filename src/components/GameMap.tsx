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
import regionHotspots from "../data/regionHotspots"; // clickable map spots
import scenesData from "../data/scenes.json"; // data about when scenes unlock

// A lightweight type describing the shape of the scene unlock data so TypeScript
// can help us catch mismatches with the JSON file.
interface SceneUnlock {
  id: number;
  unlock_xp: number;
}
import { useGameStore } from "../services/gameState"; // global game data store

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {/* The padding class was changed from p-4 to p-8 to match the original 2rem */}
      <div className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        <img
          src="/assets/images/map/world-map.png"
          alt="World Map"
          className="w-full h-auto object-cover"
        />

        {regionHotspots.map((region) => {
          // Each hotspot is a button positioned over the map
          const unlocked = isUnlocked(region.sceneId);
          return (
            <button
              key={region.id}
              style={region.style}
              aria-label={`Select ${region.name}`}
              title={region.name}
              disabled={!unlocked}
              className={`absolute bg-transparent focus:outline-none transition-opacity ${unlocked ? "hover:bg-white hover:bg-opacity-20" : "opacity-50 cursor-not-allowed"}`}
              onClick={() => unlocked && handleRegionClick(region.sceneId)}
            />
          );
        })}
        {/* TODO: allow navigating regions via keyboard for accessibility */}
      </div>
    </div>
  );
}
