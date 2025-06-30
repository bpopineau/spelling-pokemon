// ---------------------------------------------------------------------------
// ProgressBar Component (src/components/ProgressBar.tsx)
// ---------------------------------------------------------------------------
// A thin wrapper around MUI's LinearProgress component that also displays the
// current and total XP values. The styling here is intentionally generic so the
// bar can be reused in multiple screens with different labels.
// ---------------------------------------------------------------------------
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
//
// Development Plan:
// - Expose color and label props so the progress bar can adapt to different
//   themes or be repurposed for mini-progress indicators elsewhere.
// - Add an optional animation prop to control whether the bar fills with a
//   transition, which could be useful for results screens.
// - Document recommended sizing and usage examples in docs/DEVELOPMENT_NOTES.md to
//   encourage consistent styling across pages.
// - Consider extracting the calculation logic to a helper so other progress
//   meters can reuse it without duplicating math.

interface ProgressBarProps {
  /** Current XP or progress value */
  current: number;
  /** Maximum value to complete the bar */
  total: number;
  /** Optional label displayed above the bar */
  label?: string;
  /**
   * Color for the bar. Matches MUI's `LinearProgress` color prop so themes
   * remain consistent across components.
   */
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
}

/**
 * Visual progress bar showing XP progress toward the next level.
 */
export default function ProgressBar({
  current,
  total,
  label = "PROGRESS",
  color = "primary",
}: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  // This component is intentionally simple so that it can be reused anywhere we
  // display XP or progress metrics. MUI's `LinearProgress` handles the heavy
  // lifting of the actual bar rendering.

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2, width: '100%' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
        {label.toUpperCase()}
      </Typography>
      <Box sx={{ width: '100%', mt: 0.5 }}>
        <LinearProgress variant="determinate" value={percentage} color={color} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 'medium' }}>
        {current} / {total} XP
      </Typography>
    </Box>
  );
}