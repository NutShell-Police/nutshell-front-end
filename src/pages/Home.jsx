import React, { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import MapSection from '../components/Map/MapSection';

const Home = () => {
  const [prediction, setPrediction] = useState('Predict Now!');

  return (
    <Container sx={{ maxWidth: '100%', mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 0.5 }}>
            <PredictionForm setPrediction={setPrediction} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ p: 0.5 }}>
            <PredictionResult prediction={prediction} />
          </Box>
          <Box sx={{ p: 0.5, mt: 1 }}>
            <MapSection prediction={prediction} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;

// Home.jsx
