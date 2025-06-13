import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

interface ProgressBarProps {
  /** Current XP gained within the level */
  current: number;
  /** XP required to reach the next level */
  total: number;
}

/**
 * Visual progress bar showing XP progress toward the next level.
 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2, width: '100%' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
        PROGRESS
      </Typography>
      <Box sx={{ width: '100%', mt: 0.5 }}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 'medium' }}>
        {current} / {total} XP
      </Typography>
    </Box>
  );
}