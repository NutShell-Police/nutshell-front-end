import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';

const PredictionResult = ({ prediction, onPredictionChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to handle prediction change
  const handlePredictionChange = (event) => {
    const newPrediction = event.target.value;
    onPredictionChange(newPrediction); // Call the parent component's function to update prediction
  };

  return (
    <Box 
      sx={{ 
        mt: 4, 
        p: isMobile ? 2 : 4, 
        border: '1px solid', 
        borderColor: 'grey.400', 
        borderRadius: 2, 
        boxShadow: 1,
        bgcolor: 'background.paper',
        width: '100%',
        maxWidth: isMobile ? '100%' : '75vw',
        mx: 'auto'
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 2 }}>
        Prediction Result
      </Typography>
      <Typography variant={isMobile ? 'h6' : 'h5'} color="primary">
        {prediction}
      </Typography>
    </Box>
  );
};

export default PredictionResult;

