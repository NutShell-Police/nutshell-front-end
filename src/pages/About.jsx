// src/pages/About.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2" color="primary">About Page</Typography>
      <Typography variant="body1">This app helps predict accidents based on various factors to improve road safety in Karnataka.</Typography>
    </Box>
  );
};

export default About;
