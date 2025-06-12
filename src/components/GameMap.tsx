/**
 * GameMap Component
 * Displays the world map as the main entry screen with interactive hotspots.
 */
import { useNavigate } from 'react-router-dom';
import regionHotspots from '../data/regionHotspots';

export default function GameMap() {
    const navigate = useNavigate();

    const handleRegionClick = (sceneId: number) => {
        navigate(`/scene/${sceneId}`);
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

                {regionHotspots.map(region => (
                    <button
                        key={region.id}
                        style={region.style}
                        aria-label={`Select ${region.name}`}
                        title={region.name}
                        className="absolute bg-transparent hover:bg-white hover:bg-opacity-20 focus:outline-none transition-opacity"
                        onClick={() => handleRegionClick(region.sceneId)}
                    />
                ))}
            </div>
        </div>
    );
}