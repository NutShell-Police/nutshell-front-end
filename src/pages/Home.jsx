import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import MapSection from '../components/Map/MapSection';

const Home = () => {
  const [prediction, setPrediction] = useState('');

  return (
    <Container sx={{ maxWidth: '75%' }}>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PredictionForm setPrediction={setPrediction} style={{ width: '100%', maxWidth: '70vw' }} />
        {prediction && (
          <>
            <PredictionResult prediction={prediction} onPredictionChange={setPrediction} />
            <MapSection prediction={prediction} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;
