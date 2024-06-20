import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Slider, Typography, CircularProgress, Alert, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';

const PredictionForm = ({ setPrediction, formData, setFormData }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSliderChange = (event, value) => {
    setFormData({
      ...formData,
      Noofvehicle_involved: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('https://nutshell-api.azurewebsites.net/predict', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setPrediction(response.data.prediction);
      setSuccess('Analysis fetched successfully!');
    } catch (error) {
      console.error('Error making Analysis', error);
      setError('Failed to fetch Analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        width: '100%',
        p: isMobile ? 1 : 2,
        boxShadow: 3, 
        borderRadius: 2,
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 1 }}>Analytics Form</Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>Please enter the following inputs:</Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>No of vehicle involved:</Typography>
      <Slider
        name="Noofvehicle_involved"
        value={formData.Noofvehicle_involved}
        onChange={handleSliderChange}
        aria-labelledby="noofvehicle-involved-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        sx={{ mb: 2 }}
      />

      <Select
        name="Accident_Classification"
        value={formData.Accident_Classification}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>Accident Classification</MenuItem>
        <MenuItem value="Road Accidents">Road Accidents</MenuItem>
        <MenuItem value="Rail Road Accidents">Rail Road Accidents</MenuItem>
        <MenuItem value="Other Railway Accidents">Other Railway Accidents</MenuItem>
        <MenuItem value="Not Applicable">Not Applicable</MenuItem>
      </Select>

      <Select
        name="Accident_Spot"
        value={formData.Accident_Spot}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>Accident Spot</MenuItem>
        {[
          "Bottleneck", "Bridge", "Cross roads", "Not Applicable", "More than four arms",
          "Road hump or Rumble strips", "Junction", "Curves", "Other", "T Junction",
          "Offset", "Narrow road", "Culvert", "Staggered junction", "Y Junction", 
          "Circle", "Railway crossing", "Rail Crossing manned", "Round about or Circle", 
          "Rail Crossing Unmanned"
        ].map((spot) => (
          <MenuItem key={spot} value={spot}>{spot}</MenuItem>
        ))}
      </Select>

      <Select
        name="Accident_Location"
        value={formData.Accident_Location}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>Accident Location</MenuItem>
        {["Rural Areas", "Villages settlement", "City/Town", "Not Applicable"].map((location) => (
          <MenuItem key={location} value={location}>{location}</MenuItem>
        ))}
      </Select>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
          Analyze
        </Button>
      )}

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
    </Box>
  );
};

export default PredictionForm;
