// pages/Home.jsx

//Home
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import MapSection from '../components/Map/MapSection';

const Home = () => {
  const [prediction, setPrediction] = useState('');

  return (
    <Container>
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PredictionForm setPrediction={setPrediction} style={{ width: '100%', maxWidth: '70vw' }} />
        {prediction && (
          <>
            {/* Display PredictionResult only once */}
            <PredictionResult prediction={prediction} onPredictionChange={setPrediction} />
            {/* Display the MapSection component */}
            <MapSection prediction={prediction} />
          </>
        )}
      </Box>
    </Container>
  );
};

export default Home;

// Home.jsx
