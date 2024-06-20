import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import MapSection from '../components/Map/MapSection';
import ChartsSection from '../components/Charts/ChartsSection';

function Analysis() {
    const [prediction, setPrediction] = useState('Analyze Now!');
    const [formData, setFormData] = useState({
      Noofvehicle_involved: 1,
      Accident_Classification: '',
      Accident_Spot: '',
      Accident_Location: ''
    });
  
    return (
      <Container sx={{ maxWidth: "100%", mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <PredictionForm 
                setPrediction={setPrediction} 
                formData={formData}
                setFormData={setFormData}
              />
            </Box>
            <Box sx={{ flex: 2 }}>
              <PredictionResult 
                prediction={prediction} 
                formData={formData}
               />
            </Box>
          </Box>
  
          {prediction !== 'Analyze Now!' && (
            <>
              <Box sx={{ width: '100%' }}>
                <ChartsSection prediction={prediction} />
              </Box>
              <Box sx={{ width: '100%' }}>
                <MapSection prediction={prediction}/>
              </Box>
            </>
          )}
        </Box>
      </Container>
    );
}

export default Analysis;
