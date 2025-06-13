// Small on-screen keyboard for touch devices.
//
// It mirrors a simplified QWERTY layout so players on phones or tablets can
// input letters without relying on their device's built-in keyboard. The parent
// component supplies callbacks for both key presses and backspace events.

interface KeyboardProps {
  // Add a letter to the input
  onKey: (char: string) => void;
  // Remove the last letter
  onBackspace: () => void;
}

// Each row of keys on the keyboard
const layout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export default function OnScreenKeyboard({
  onKey,
  onBackspace,
}: KeyboardProps) {
  // Render three rows of letter buttons followed by a backspace button. The
  // layout array defined above controls the characters displayed on each row.
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {layout.map((row, idx) => (
        <div key={idx} className="flex gap-1">
          {row.map((ch) => (
            // Regular letter button
            <button
              key={ch}
              onClick={() => onKey(ch)}
              className="w-8 h-8 bg-gray-200 rounded text-sm font-bold hover:bg-gray-300"
            >
              {ch}
            </button>
          ))}
        </div>
      ))}
      <div className="flex gap-1">
        {/* Backspace key. Clicking this removes the last character from the
            player's input. */}
        <button
          onClick={onBackspace}
          className="flex-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm font-bold"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
