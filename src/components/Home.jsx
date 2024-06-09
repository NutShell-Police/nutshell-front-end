// src/components/Home.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h2" color="primary">Home Page</Typography>
      <Typography variant="body1">Welcome to the Accident Prediction App for Karnataka Traffic Police.</Typography>
    </Box>
  );
}

export default Home;
