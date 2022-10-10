import React, { useState } from 'react';
import { AppBar, Toolbar, Drawer, Typography, Box, Divider, List, ListItemButton , ListItemText, ListItemIcon, IconButton } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from "react-router-dom";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { format } from "date-fns";
import Avatar from '@mui/material/Avatar';


export default function Layout({ children, window }) {
  const drawerWidth = 200;
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectIcon color="secondary" />,
      path: "/"
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineIcon color="secondary" />,
      path: "/create"
    },
  ]

  const drawer = (
    <Drawer
    sx={{
      width: drawerWidth,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
      }
    }}
    variant="permanent"
    anchor="left"
    >
    <Box display="flex" sx={{m: 2}}>
      <DriveFileRenameOutlineIcon fontSize="large" sx={{mr: 2}}/>
      <Typography variant="h5" component="div">Notes</Typography>
    </Box>

    <Divider />

    <List>
      {
        menuItems.map(item => (
          <ListItemButton
            sx={location.pathname === item.path ? { bgcolor: 'grey.900',}: null}
            key={item.text}
            onClick={()=>navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text}/>
          </ListItemButton>
        ))
      }
    </List>
  </Drawer>
  )

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{my:0.25}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Today is { format(new Date(), "do MMM Y") }
          </Typography>
          <Typography sx={{mr: 1}}>Geralt</Typography>
          <Avatar alt="Geralt" src="/geralt-av.jpg" />
        </Toolbar>
      </AppBar>

      <Box>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Toolbar />
      <Box
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
      {children}
      </Box>
    </Box>
  )
}
