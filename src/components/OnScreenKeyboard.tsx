// Small on-screen keyboard for touch devices.
//
// It mirrors a simplified QWERTY layout so players on phones or tablets can
// input letters without relying on their device's built-in keyboard. The parent
// component supplies callbacks for both key presses and backspace events.
//
// If we ever support internationalization the layout could be generated from a
// config file so that different alphabets are supported.
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
//
// Development Plan:
// - Allow passing a custom keyboard layout through props so alternate language
//   keyboards (e.g., AZERTY) can be supported in the future.
// - Provide visual feedback when a key is pressed to make the input more
//   satisfying on touch devices.
// - Consider adding long-press support for accented characters if the word list
//   expands to other languages.
// - Expose a callback for key hover so accessibility tools can announce letters
//   before they are pressed.
// - Document how to customize layouts in README.md to make future localization
//   efforts straightforward.

interface KeyboardProps {
  // Add a letter to the input
  onKey: (char: string) => void;
  // Remove the last letter
  onBackspace: () => void;
}

// Each row of keys on the keyboard. The layout intentionally omits symbols and
// numbers to keep the challenge focused purely on spelling letters.
const layout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export default function OnScreenKeyboard({
  onKey,
  onBackspace,
}: KeyboardProps) {
  // Render three rows of letter buttons followed by a backspace button.
  return (
    <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
      {layout.map((row, idx) => (
        <Stack key={idx} direction="row" spacing={1}>
          {row.map((ch) => (
            <Button
              key={ch}
              onClick={() => onKey(ch)}
              variant="outlined"
              sx={{ minWidth: '40px', padding: '8px', textTransform: 'lowercase' }}
            >
              {ch}
            </Button>
          ))}
        </Stack>
      ))}
      <Stack direction="row" spacing={1}>
        <Button
          onClick={onBackspace}
          variant="outlined"
          sx={{ minWidth: '80px' }}
        >
          ⌫
        </Button>
      </Stack>
    </Stack>
  );
}