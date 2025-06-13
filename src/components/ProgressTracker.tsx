import badges from "../data/badges.json";
import { useGameStore } from "../services/gameState";

export default function ProgressTracker() {
  const { xp, level, wordsMastered, collectedPokemonIds, earnedBadges } =
    useGameStore();

  const earned = badges.filter((b) => earnedBadges.includes(b.id));

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Progress Tracker</h1>
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Level</h2>
          <p>{level}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">XP</h2>
          <p>{xp}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Words Mastered</h2>
          <p>{wordsMastered}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold">Pokémon</h2>
          <p>{collectedPokemonIds.length}</p>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2 text-center">Badges</h2>
      {earned.length === 0 ? (
        <p className="text-center">No badges earned yet.</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-4">
          {earned.map((b) => (
            <li key={b.id} className="bg-white rounded shadow p-2 text-sm">
              {b.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
