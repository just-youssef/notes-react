import React from 'react';
import { AppBar, Toolbar, Drawer, Typography, Box, Divider, List, ListItemButton , ListItemText, ListItemIcon } from '@mui/material';
import SubjectIcon from '@mui/icons-material/Subject';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate, useLocation } from "react-router-dom";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { format } from "date-fns";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const drawerWidth = 200;

export default function NoteCard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
      >
        <Toolbar sx={{my:0.25}}>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            Today is { format(new Date(), "do MMM Y") }
          </Typography>
          <Typography sx={{mr: 1}}>Geralt</Typography>
          <Avatar alt="Geralt" src="/geralt-av.jpg" />
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Stack direction="row">
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

        {children}
      </Stack>
    </Box>
  )
}
