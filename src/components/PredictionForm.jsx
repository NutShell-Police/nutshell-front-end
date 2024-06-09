// src/components/PredictionForm.jsx
import React, { useState } from 'react';
import { Box, Button, MenuItem, Select, Slider, Typography } from '@mui/material';
import axios from 'axios';

const PredictionForm = ({ setPrediction }) => {
  const [formData, setFormData] = useState({
    Noofvehicle_involved: 1,
    Accident_Classification: '',
    Accident_Spot: '',
    Accident_Location: ''
  });

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
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error making prediction', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6">Please enter the following inputs:</Typography>
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
      />
      <Select
        name="Accident_Classification"
        value={formData.Accident_Classification}
        onChange={handleChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Accident Classification
        </MenuItem>
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
        <MenuItem value="" disabled>
          Accident Spot
        </MenuItem>
        {["Bottleneck", "Bridge", "Cross roads", "Not Applicable", "More than four arms", "Road hump or Rumble strips", "Junction", "Curves", "Other", "T Junction", "Offset", "Narrow road", "Culvert", "Staggered junction", "Y Junction", "Circle", "Railway crossing", "Rail Crossing manned", "Round about or Circle", "Rail Crossing Unmanned"].map((spot) => (
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
        <MenuItem value="" disabled>
          Accident Location
        </MenuItem>
        {["Rural Areas", "Villages settlement", "City/Town", "Not Applicable"].map((location) => (
          <MenuItem key={location} value={location}>{location}</MenuItem>
        ))}
      </Select>
      <Button type="submit" variant="contained" color="primary">
        Predict
      </Button>
    </Box>
  );
};

export default PredictionForm;
