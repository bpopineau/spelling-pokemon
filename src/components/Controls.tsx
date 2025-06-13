// Buttons shown under the spelling input.
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {/* Repeat the word out loud */}
      <Button
        variant="outlined"
        onClick={onRepeat}
      >
        Repeat
      </Button>

      {/* Fill in the next letter */}
      <Button
        variant="outlined"
        onClick={onHint}
        disabled={hintDisabled}
      >
        Hint
      </Button>

      {/* Check the spelling */}
      <Button
        variant="contained"
        onClick={onSubmit}
      >
        Submit
      </Button>
    </Stack>
  );
}