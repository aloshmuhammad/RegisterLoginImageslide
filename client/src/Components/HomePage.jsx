import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  Hidden,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: "unset",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
          marginTop: "64px",
          boxSizing: "border-box",
        },
      },
    },
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const HomePage = () => {

    const userDetail=useSelector((state)=>state.userSlice.user)

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate=useNavigate()

  const handleLogOut = () => {
    localStorage.clear()
    navigate('/')
   
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{ flexGrow: 1 }}
              variant="h6"
              noWrap
              component="div"
            >
              Welcome {userDetail.name}
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                onClick={handleLogOut}
                sx={{ alignItems: "end", backgroundColor: "red" }}
                variant="contained"
              >
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              marginTop: "64px",
              zIndex: theme.zIndex.appBar - 1,
            }}
            classes={{
              paper: "MuiDrawer-paper",
            }}
            open={drawerOpen}
          >
            <DrawerHeader />
            <Divider />
            <List>
              <ListItemButton
                sx={{ backgroundColor: "black" }}
                component={Link}
                to=""
              >
                <ListItemIcon>{/* Add icon component here */}</ListItemIcon>
                <ListItemText sx={{ color: "cyan" }} primary="Users" />
              </ListItemButton>
              
            
            </List>
            <Divider />
            {/* Add additional sections or menu items here */}
          </Drawer>
        </Hidden>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: "64px",
            ...(drawerOpen && {
              marginLeft: `${drawerWidth}px`,
            }),
          }}
        >
          {/* Add your dashboard content here */}
        </Box>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: drawerWidth,
              marginTop: "64px",
              zIndex: theme.zIndex.appBar - 1,
            }}
            classes={{
              paper: "MuiDrawer-paper",
            }}
          >
            <DrawerHeader />
            <Divider />
            <List>
              <Link to="/admin/users-list">
                <ListItemButton sx={{ backgroundColor: "black" }}>
                  <ListItemIcon>{/* Add icon component here */}</ListItemIcon>
                  <ListItemText sx={{ color: "cyan" }} primary="Students" />
                </ListItemButton>
              </Link>
              
             
              
            </List>
            <Divider />

          </Drawer>
        </Hidden>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
