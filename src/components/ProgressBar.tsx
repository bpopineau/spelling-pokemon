// File: src/components/ProgressBar.tsx
//
// Reusable XP progress bar with numeric label and ARIA progress semantics.

import { FC, useMemo } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

export interface ProgressBarProps {
  /** XP gained toward the current level */
  current: number;
  /** XP required to reach the next level */
  total: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = useMemo(
    () => (total > 0 ? (current / total) * 100 : 0),
    [current, total],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        width: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary" fontWeight="bold">
        PROGRESS
      </Typography>

      {/* MUI progress bar with accessible attributes */}
      <Box
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        sx={{ width: "100%", mt: 0.5 }}
      >
        <LinearProgress variant="determinate" value={percentage} />
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5, fontWeight: 500 }}
      >
        {current} / {total} XP
      </Typography>
    </Box>
  );
};

export default ProgressBar;

// TODO: Support a compact (horizontal-only) variant if needed in tighter layouts.
