import React from 'react';
import { Typography, Box } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ 
        width: '100%', 
        py: 0.5, 
        textAlign: 'center', 
        background: 'linear-gradient(90deg, rgba(6,0,116,1) 0%, rgba(9,9,121,1) 35%, rgba(0,88,185,1) 100%)', 
        color: 'primary.contrastText',
        fontFamily: 'Nunito, sans-serif',
        mt: 'auto' 
      }}
    >
      <Typography variant="body2">
        © 2024 Karnataka State Police. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
