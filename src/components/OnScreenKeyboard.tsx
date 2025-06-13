// File: src/components/OnScreenKeyboard.tsx
//
// A simplified QWERTY keyboard for touch devices.
// Parent component supplies onKey and onBackspace callbacks.

import { FC, memo } from 'react';
import { Button, Stack } from '@mui/material';

export interface KeyboardProps {
  onKey: (char: string) => void;     // Add a letter
  onBackspace: () => void;           // Remove last letter
}

// Static keyboard layout (rows of characters)
const LAYOUT: ReadonlyArray<ReadonlyArray<string>> = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

const OnScreenKeyboard: FC<KeyboardProps> = ({ onKey, onBackspace }) => {
  return (
    <Stack spacing={1} alignItems="center" sx={{ mt: 2 }}>
      {LAYOUT.map((row, rowIdx) => (
        <Stack key={`row-${rowIdx}`} direction="row" spacing={1}>
          {row.map((ch) => (
            <Button
              key={ch}
              variant="outlined"
              size="small"
              aria-label={`Letter ${ch.toUpperCase()}`}
              onClick={() => onKey(ch)}
              sx={{ minWidth: 40, p: 1, textTransform: 'lowercase' }}
            >
              {ch}
            </Button>
          ))}
        </Stack>
      ))}

      {/* Backspace */}
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          aria-label="Backspace"
          onClick={onBackspace}
          sx={{ minWidth: 80 }}
        >
          ⌫
        </Button>
      </Stack>
    </Stack>
  );
};

export default memo(OnScreenKeyboard);

// TODO: Consider theme-based sizing for buttons.
// TODO: Add key-press sounds or haptic feedback on mobile (optional).
