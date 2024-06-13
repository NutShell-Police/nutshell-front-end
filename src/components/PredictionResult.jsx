import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';

const PredictionResult = ({ prediction }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        p: isMobile ? 1 : 2, 
        border: '1px solid', 
        borderColor: 'grey.400', 
        borderRadius: 2, 
        boxShadow: 1,
        bgcolor: 'background.paper',
        width: '100%',
        mx: 'auto'
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 1 }}>
        Prediction Result
      </Typography>
      <Typography variant={isMobile ? 'h6' : 'h5'} color="primary">
        {prediction}
      </Typography>
    </Box>
  );
};

export default PredictionResult;
