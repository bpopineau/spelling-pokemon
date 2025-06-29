// -----------------------------------------------------------------------------
// NotFound Component (src/components/NotFound.tsx)
// -----------------------------------------------------------------------------
// Displays a friendly 404 page when the user navigates to an unknown route.
// It provides a button to return to the main map so players don't get stuck.
//
// Development Plan:
// - Add more thematic artwork once final assets are available.
// - Include helpful links such as the Pokédex or progress page for quick access.
// - Consider tracking 404 hits in analytics to discover broken links.

import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

/**
 * A simple fallback screen for unmatched routes.
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Typography sx={{ mb: 4 }}>
        The page you are looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>Return to Map</Button>
    </Box>
  );
}
