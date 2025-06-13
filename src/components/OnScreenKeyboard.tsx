// Small on-screen keyboard for touch devices.
//
// It mirrors a simplified QWERTY layout so players on phones or tablets can
// input letters without relying on their device's built-in keyboard. The parent
// component supplies callbacks for both key presses and backspace events.
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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