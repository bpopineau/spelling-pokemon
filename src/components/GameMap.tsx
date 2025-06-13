/**
 * GameMap Component
 *
 * This screen shows the big world map. The player can click on
 * different areas to start a scene. Each area unlocks when the
 * player has enough experience points.
 */
import { useNavigate } from "react-router-dom"; // used to change screens
import regionHotspots from "../data/regionHotspots"; // clickable map spots
import scenesData from "../data/scenes.json"; // data about when scenes unlock

// Simple type so we know what data scenes.json gives us
interface SceneUnlock {
  id: number;
  unlock_xp: number;
}
import { useGameStore } from "../services/gameState"; // global game data store

export default function GameMap() {
  const navigate = useNavigate(); // allows changing the URL
  const { xp } = useGameStore(); // player's current XP

  // When a region button is clicked we go to the scene page
  const handleRegionClick = (sceneId: number) => {
    navigate(`/scene/${sceneId}`);
  };

  // Check if the player has enough XP to visit a scene
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
      </div>
    </div>
  );
}
