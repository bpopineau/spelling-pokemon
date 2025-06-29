// The persistent header that appears on most screens.
import { NavLink } from "react-router-dom";
//
// Development Plan:
// - Extract the list of navigation links to a separate configuration so new
//   menu items can be added without editing JSX.
// - Include an optional settings or help menu once those screens are built.
// - Consider making the header sticky on mobile to keep navigation accessible
//   during scrolling.
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