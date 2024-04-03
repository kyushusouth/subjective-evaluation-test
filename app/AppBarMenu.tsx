"use client";

import { useState } from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Breakpoint } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";

export default function AppBarMenu({
  isLoggedIn,
  toolBarMaxWidth,
}: {
  isLoggedIn: boolean;
  toolBarMaxWidth: Breakpoint;
}) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        sx={{
          py: 1,
          position: "sticky",
        }}
      >
        <Container maxWidth={toolBarMaxWidth}>
          <Toolbar
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "2rem",
                  md: "3rem",
                },
                color: "primary.main",
              }}
            >
              <Link href="/" className="no-underline">
                主観評価実験
              </Link>
            </Typography>
            {isLoggedIn ? (
              <IconButton
                onClick={handleDrawerOpen}
                sx={{
                  ...(open && { display: "none" }),
                  color: "inherit",
                }}
              >
                <MenuIcon
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "2rem",
                      md: "3rem",
                    },
                  }}
                />
              </IconButton>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
        <Box sx={{ py: 2 }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "2rem",
                  md: "3rem",
                },
              }}
            />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            width: {
              xs: 200,
              md: 300,
              lg: 400,
              xl: 500,
            },
          }}
          role="presentation"
          onClick={handleDrawerClose}
        >
          <List
            sx={{
              mt: 5,
            }}
          >
            {[
              ["ホーム", "/"],
              ["年齢・性別", "/info"],
              ["練習試行", "/eval"],
            ].map((item) => (
              <ListItem key={item[0]} disablePadding>
                <ListItemButton>
                  <Link href={item[1]}>{item[0]}</Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
