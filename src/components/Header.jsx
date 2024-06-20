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
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InfoIcon from '@mui/icons-material/Info';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import logo from '../assets/Nut-Shell-Logo.svg';
import ev from '/logo.png'

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
        {/* <ListItem button component={Link} to="/upload-video">
          <ListItemIcon sx={{ color: 'white' }}>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText primary="Upload Video" />
        </ListItem> */}
        <ListItem button component={Link} to="/prediction">
          <ListItemIcon sx={{ color: 'white' }}>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText primary="Prediction" />
        </ListItem>
        <ListItem button component={Link} to="/analysis">
          <ListItemIcon sx={{ color: 'white' }}>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analyze" />
        </ListItem>
        <ListItem button component={Link} to="/report">
          <ListItemIcon sx={{ color: 'white' }}>
            <FlagCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
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
        background: 'linear-gradient(90deg, rgba(6,0,116,1) 0%, rgba(9,9,121,1) 35%, rgba(0,88,185,1) 100%)', // Gradient from dark blue to light blue
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
              {/* <Button color="inherit" component={Link} to="/upload-video" sx={{ ml: 2 }}>Upload Video</Button> */}
              <Button color="inherit" component={Link} to="/prediction" sx={{ ml: 2 }}>Prediction</Button>
              <Button color="inherit" component={Link} to="/analysis" sx={{ ml: 2 }}>Analysis</Button>
              <Button color="inherit" component={Link} to="/report" sx={{ ml: 2 }}>Report</Button>
            </>
          )}
        </Box>
        {!isMobile ? (
          <Box sx={{ marginLeft: 'auto', p: 0 }}>
          <Button color="inherit" component={Link} to="https://hack2skill.com/hack/kspdatathon2024" sx={{ p: 0 }}>
            <Box component="img" src={ev} alt="Karnataka State Police Logo" sx={{ height: 60, borderRadius: 2 }} />
          </Button>
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
