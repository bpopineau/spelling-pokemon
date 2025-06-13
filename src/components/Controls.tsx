// Buttons shown under the spelling input.
//
// This component is intentionally small and purely presentational. It exposes a
// few callback props so the parent component (`SpellingChallenge`) can decide
// what happens when each button is pressed.
interface ControlsProps {
  onSubmit: () => void;
  onHint: () => void;
  onRepeat: () => void;
  hintDisabled: boolean;
}

// Simple component to show the repeat, hint and submit buttons
export default function Controls({
  onSubmit,
  onHint,
  onRepeat,
  hintDisabled,
}: ControlsProps) {
  return (
    <div className="flex justify-center flex-wrap gap-2 mt-4">
      {/* Repeat the word out loud */}
      <button
        onClick={onRepeat}
        className="h-12 px-4 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
      >
        Repeat Word 🔁
      </button>
      {/* Fill in the next letter */}
      <button
        onClick={onHint}
        disabled={hintDisabled}
        className="h-12 px-4 bg-purple-500 rounded-md text-white font-bold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-400"
      >
        Hint ✨
      </button>
      {/* Check the spelling */}
      <button
        onClick={onSubmit}
        className="h-12 px-8 bg-green-500 rounded-md text-white font-bold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        Submit
      </button>
    </div>
  );
}
