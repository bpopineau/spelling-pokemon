// File: src/components/Controls.tsx
//
// Action buttons shown beneath the spelling input:
// Repeat (TTS), Hint (reveal next letter), and Submit (check spelling).

import { FC, memo } from 'react';
import { Button, Stack } from '@mui/material';
import Icon from './Icon';        // Adjust path if needed

export interface ControlsProps {
  onSubmit: () => void;
  onHint: () => void;
  onRepeat: () => void;
  hintDisabled: boolean;
  submitDisabled?: boolean;
}

const Controls: FC<ControlsProps> = ({
  onSubmit,
  onHint,
  onRepeat,
  hintDisabled,
  submitDisabled = false,
}) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {/* Repeat */}
      <Button
        variant="outlined"
        aria-label="Repeat word"
        startIcon={<Icon name="repeat_icon" size={20} />}
        onClick={onRepeat}
        disabled={submitDisabled}
      >
        Repeat
      </Button>

      {/* Hint */}
      <Button
        variant="outlined"
        aria-label="Get a hint"
        startIcon={<Icon name="hint_icon" size={20} />}
        onClick={onHint}
        disabled={hintDisabled || submitDisabled}
      >
        Hint
      </Button>

      {/* Submit */}
      <Button
        variant="contained"
        aria-label="Submit spelling"
        startIcon={<Icon name="submit_icon" size={20} />}
        onClick={onSubmit}
        disabled={submitDisabled}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default memo(Controls);

// TODO: Extract common button style props into a theme variant if reused elsewhere.
// TODO: Add keyboard shortcut support (e.g., Enter to submit, H for hint).
