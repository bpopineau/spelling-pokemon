/**
 * GameMap Component
 * Displays the world map as the main entry screen with interactive hotspots.
 */
import regionHotspots from '../data/regionHotspots';

export default function GameMap() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
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
                        className="absolute bg-transparent focus:outline-none"
                        onClick={() => console.log('Clicked:', region.name)}
                    />
                ))}
            </div>
        </div>
    );
}
