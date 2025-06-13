/**
 * GameMap Component
 * Displays the world map as the main entry screen with interactive hotspots.
 */
import { useNavigate } from "react-router-dom";
import regionHotspots from "../data/regionHotspots";
import scenesData from "../data/scenes.json";

interface SceneUnlock {
  id: number;
  unlock_xp: number;
}
import { useGameStore } from "../services/gameState";

export default function GameMap() {
  const navigate = useNavigate();
  const { xp } = useGameStore();

  const handleRegionClick = (sceneId: number) => {
    navigate(`/scene/${sceneId}`);
  };

  const isUnlocked = (sceneId: number) => {
    const scenes = scenesData as SceneUnlock[];
    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene) return false;
    return xp >= scene.unlock_xp;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      {/* The padding class was changed from p-4 to p-8 to match the original 2rem */}
      <div className="relative w-full max-w-4xl rounded-lg overflow-hidden shadow-lg">
        <img
          src="/assets/images/map/world-map.png"
          alt="World Map"
          className="w-full h-auto object-cover"
        />

        {regionHotspots.map((region) => {
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
