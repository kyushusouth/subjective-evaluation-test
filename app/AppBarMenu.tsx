import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

export default function AppBarMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            主観評価実験
          </Typography>
          {isLoggedIn ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
