import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Report';
import logo from '../assets/Nut-Shell-Logo.svg';

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = (
    <Box
      sx={{
        width: 250,
        bgcolor: 'primary.main',
        color: 'white',
        height: '100%',
        fontFamily: 'Nunito, sans-serif',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: 'white' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/upload-video">
          <ListItemIcon sx={{ color: 'white' }}>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText primary="Upload Video" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemIcon sx={{ color: 'white' }}>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
        <ListItem button component={Link} to="/detection">
          <ListItemIcon sx={{ color: 'white' }}>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText primary="Detection" />
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon sx={{ color: 'white' }}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        fontFamily: 'Nunito, sans-serif',
        p: 0,
        background: 'linear-gradient(45deg, #00008B, #FF0000)', // Gradient from dark blue to light blue
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
          <Button color="inherit" component={Link} to="/" sx={{ p: 0 }}>
            <Box component="img" src={logo} alt="Nut Shell Logo" sx={{ height: 80 }} />
          </Button>
          {isMobile && (
            <Box sx={{ ml: 1, color: 'white', fontFamily: 'Nunito, sans-serif', fontSize: '1.5rem' }}>
              Nutshell
            </Box>
          )}
          {!isMobile && (
            <>
              <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>Home</Button>
              <Button color="inherit" component={Link} to="/upload-video" sx={{ ml: 2 }}>Upload Video</Button>
              <Button color="inherit" component={Link} to="/detection" sx={{ ml: 2 }}>Detection</Button>
              <Button color="inherit" component={Link} to="/report" sx={{ ml: 2 }}>Report</Button>
            </>
          )}
        </Box>
        {!isMobile ? (
          <Box sx={{ marginLeft: 'auto', p: 0 }}>
            <Button color="inherit" component={Link} to="/about" sx={{ ml: 2}}>About</Button>
          </Box>
        ) : (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)} sx={{ ml: 'auto' }}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {menuItems}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
