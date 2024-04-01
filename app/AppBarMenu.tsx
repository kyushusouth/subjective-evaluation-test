import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleDrawer from "@/app//ToggleDrawer";

export default function AppBarMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            主観評価実験
          </Typography>
          {isLoggedIn ? <ToggleDrawer /> : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
