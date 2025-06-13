// Shows the player's level, XP and earned badges.
//
// This component reads progress information from the global store and presents
// it in a simple dashboard format. It doesn't include any interactive controls
// beyond listing the data.
// TODO: display XP progress using <ProgressBar> like in SpellingChallenge
//       or shadcn/ui's `<Progress>` component once shadcn/ui is installed.
//       See https://ui.shadcn.com/docs/components/progress
import badges from "../data/badges.json";
import { useGameStore } from "../services/gameState";

export default function ProgressTracker() {
  // Pull various progress metrics from the central store
  const { xp, level, wordsMastered, collectedPokemonIds, earnedBadges } =
    useGameStore();

  // Only keep badges that have been earned. The badge list is static so we
  // simply filter the IDs we have earned.
  const earned = badges.filter((b) => earnedBadges.includes(b.id));

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Progress Tracker</h1>
      {/* Summary numbers showing overall progress */}
      {/* TODO: Consider using shadcn/ui's `<Card>` component for each stat
          to ensure consistent padding and shadows.
          See https://ui.shadcn.com/docs/components/card */}
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
      {/* List of earned badges */}
      <h2 className="text-2xl font-bold mt-6 mb-2 text-center">Badges</h2>
      {earned.length === 0 ? (
        // TODO: Could also use <Alert> from shadcn/ui to show this message.
        // See https://ui.shadcn.com/docs/components/alert
        <p className="text-center">No badges earned yet.</p>
      ) : (
        // TODO: Each badge could be a `<Card>` as well for a consistent look.
        <ul className="flex flex-wrap justify-center gap-4">
          {/* Show each earned badge */}
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
