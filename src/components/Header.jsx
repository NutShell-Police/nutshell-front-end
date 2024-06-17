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
    <AppBar position="static" color="primary" sx={{ fontFamily: 'Nunito, sans-serif' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/" sx={{ mr: 2 }}>
            <Box component="img" src={logo} alt="Nut Shell Logo" sx={{ height: 80, p: 1 }} />
          </Button>
          {!isMobile && (
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/upload-video">Upload Video</Button>
              <Button color="inherit" component={Link} to="/detection">Detection</Button>
            </>
          )}
        </Box>
        {!isMobile && (
          <Box sx={{ marginLeft: 'auto' }}>
            <Button color="inherit" component={Link} to="/about">About</Button>
          </Box>
        )}
        {isMobile && (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {menuItems}
            </Drawer>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/upload-video">Upload Video</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/detection">Detection</Button>
            <Button color="inherit" component={Link} to="/report">Report</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

