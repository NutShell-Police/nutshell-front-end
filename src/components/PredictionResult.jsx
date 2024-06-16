import React, { useState, useEffect } from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';

const PredictionResult = ({ prediction, onPredictionChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [severityInfo, setSeverityInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle prediction change
  const handlePredictionChange = (event) => {
    const newPrediction = event.target.value;
    onPredictionChange(newPrediction); // Call the parent component's function to update prediction
  };

  // Function to fetch additional information based on severity
  const fetchSeverityInfo = async (prediction) => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `what is ${prediction} in accident in short?`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if response contains candidates and it's not empty
      if (response.data?.candidates && response.data.candidates.length > 0) {
        const generatedContent = response.data.candidates[0].content.parts[0].text;
        
        // Clean up the content and create bullet points
        const cleanedContent = generatedContent.replace(/\*\*/g, '').replace(/\*/g, '').replace(/undefined/g, '');
        const bulletPoints = cleanedContent.split('\n').filter(line => line.trim() !== '');
        
        setSeverityInfo(bulletPoints);
      } else {
        throw new Error('Invalid response structure from API');
      }
    } catch (error) {
      console.error('Error fetching severity info:', error);
      setSeverityInfo(['Failed to fetch additional information.']);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prediction) {
      fetchSeverityInfo(prediction);
    }
  }, [prediction]);

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

      <Box sx={{ mt: 2 }}>
        {loading ? (
          <Typography variant={isMobile ? 'h6' : 'h5'}>Loading...</Typography>
        ) : (
          <Box component="ul">
            {severityInfo.map((point, index) => (
              <Typography key={index} variant={isMobile ? 'body1' : 'h6'} component="li">
                {point}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PredictionResult;
