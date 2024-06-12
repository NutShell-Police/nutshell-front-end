import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/Nut-Shell-Logo.svg';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box component="img" src={logo} alt="Nut Shell Logo" sx={{ height: 80, mr: 2, p: 1 }} />
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          NutShell
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/upload-video">Upload Video</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

