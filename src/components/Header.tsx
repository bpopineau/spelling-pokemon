// File: src/components/Header.tsx
//
// Persistent top navigation bar with links to Map, Pokédex, and Progress screens.
// Uses NavLink’s `isActive` predicate to style the current page.

import { FC } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  "&.active": {
    borderBottom: "2px solid currentColor",
  },
} as const;

const Header: FC = () => (
  <AppBar position="static">
    <Toolbar sx={{ gap: 2 }}>
      {/* Title */}
      <Typography
        variant="h6"
        component="h1"
        sx={{ flexGrow: 1, fontWeight: 600 }}
      >
        Spelling Adventure
      </Typography>

      {/* Navigation */}
      <Stack direction="row" spacing={1}>
        <Button
          component={NavLink}
          to="/"
          end
          sx={linkStyle}
        >
          Map
        </Button>
        <Button
          component={NavLink}
          to="/pokedex"
          sx={linkStyle}
        >
          Pokédex
        </Button>
        <Button
          component={NavLink}
          to="/progress"
          sx={linkStyle}
        >
          Progress
        </Button>
      </Stack>
    </Toolbar>
  </AppBar>
);

export default Header;
