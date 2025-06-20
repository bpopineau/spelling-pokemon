// The persistent header that appears on most screens.
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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