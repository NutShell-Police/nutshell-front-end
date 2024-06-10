import React, { useState } from 'react';
import { Box } from '@mui/material';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';

const Home = () => {
  const [prediction, setPrediction] = useState(null);

  return (
    <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PredictionForm setPrediction={setPrediction} />
      {prediction && <PredictionResult prediction={prediction} />}
    </Box>
  );
};

export default Home;
