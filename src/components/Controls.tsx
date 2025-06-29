// Buttons shown under the spelling input. Keeping this component small and
// stateless makes it easy to swap icons or update the button layout without
// affecting the spelling logic.
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Icon from "@/components/Icon"; // Import our custom Icon component
//
// Development Plan:
// - Make button labels configurable so translations/localization can swap text
//   without editing this file.
// - Expose a prop to hide the hint button for scenes where hints are disabled.
// - Investigate using MUI's IconButton component for a more compact layout on
//   small screens.
// - Add aria-labels to all buttons and document them so screen reader support
//   works consistently across platforms.
// - Consider moving the control layout to a separate config so future mini-games
//   can reuse this component with different button sets.

interface ControlsProps {
  onSubmit: () => void;
  onHint: () => void;
  onRepeat: () => void;
  hintDisabled: boolean;
  submitDisabled?: boolean;
}

// Simple component to show the repeat, hint and submit buttons
export default function Controls({
  onSubmit,
  onHint,
  onRepeat,
  hintDisabled,
  submitDisabled,
}: ControlsProps) {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {/* Repeat the word out loud */}
      <Button
        variant="outlined"
        startIcon={<Icon name="repeat_icon" size={20} />}
        onClick={onRepeat}
        disabled={submitDisabled}
      >
        Repeat
      </Button>

      {/* Fill in the next letter */}
      <Button
        variant="outlined"
        startIcon={<Icon name="hint_icon" size={20} />}
        onClick={onHint}
        disabled={hintDisabled || submitDisabled}
      >
        Hint
      </Button>

      {/* Check the spelling */}
      <Button
        variant="contained"
        startIcon={<Icon name="submit_icon" size={20} />}
        onClick={onSubmit}
        disabled={submitDisabled}
      >
        Submit
      </Button>
    </Stack>
  );
}