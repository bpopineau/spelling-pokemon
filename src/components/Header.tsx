// ---------------------------------------------------------------------------
// Header Component (src/components/Header.tsx)
// ---------------------------------------------------------------------------
// Renders the persistent top navigation bar used on nearly every screen. The
// header currently displays the game title and a small set of navigation links.
// Keeping the header logic simple makes it easy to theme or swap out later.
// Future features such as account settings or help links should be introduced
// here so they remain consistent across the entire application.
import { NavLink } from "react-router-dom";
//
// Development Plan:
// - Extract the list of navigation links to a separate configuration so new
//   menu items can be added without editing JSX.
// - Include an optional settings or help menu once those screens are built.
// - Consider making the header sticky on mobile to keep navigation accessible
//   during scrolling.
// - Add highlighting for the active route using NavLink's styling so players
//   always know which section they are in.
// - Document the header structure in docs/DEVELOPMENT_NOTES.md so theming changes are
//   straightforward.
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Navigation is centralized here so that new sections of the app can be added
// by editing this single component.
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Spelling Adventure
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={NavLink} to="/">
          Map
        </Button>
        <Button color="inherit" component={NavLink} to="/pokedex">
          Pokédex
        </Button>
        <Button color="inherit" component={NavLink} to="/progress">
          Progress
        </Button>
      </Toolbar>
    </AppBar>
  );
}