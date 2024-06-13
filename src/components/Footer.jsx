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
        bgcolor: 'primary.main', 
        color: 'primary.contrastText',
        mt: 'auto' // This ensures the footer is pushed to the bottom
      }}
    >
      <Typography variant="body2">
        © 2023 Karnataka Traffic Police. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
