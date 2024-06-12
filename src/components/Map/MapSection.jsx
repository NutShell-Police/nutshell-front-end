
// components/Map/MapSection.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Map = ({ prediction }) => {
  const [accidentProneAreas, setAccidentProneAreas] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccidentData = async () => {
      try {
        const response = await fetch('https://nutshell-api.azurewebsites.net/process_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prediction,
            len: 58000
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched accident-prone areas:', data); // Debug log
          setAccidentProneAreas(data);
        } else {
          console.error('Failed to fetch accident-prone areas data. Server responded with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching accident-prone areas:', error);
      }
    };

    if (prediction) {
      fetchAccidentData();
    }
  }, [prediction]);

  console.log('Accident-prone areas:', accidentProneAreas); // Debug log

  const handleMapClick = () => {
    navigate('/map', { state: { prediction } });
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
        mx: 'auto',
        cursor: 'pointer' // Change cursor to pointer to indicate it's clickable
      }}
      onClick={handleMapClick}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 2 }}>
        Map
      </Typography>
      <Box sx={{ width: '100%', height: isMobile ? '30vh' : '50vh' }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {accidentProneAreas.map((area, index) => {
            console.log('Area:', area); // Debug log
            if (typeof area.LATITUDE === 'number' && typeof area.LONGITUDE === 'number' && area.LATITUDE !== 0 && area.LONGITUDE !== 0) {
              console.log('Rendering CircleMarker for area:', area); // Debug log
              return (
                <CircleMarker
                  key={index}
                  center={[area.LATITUDE, area.LONGITUDE]}
                  radius={10}
                  color="red"
                >
                  <Popup>
                    <div>
                      <strong>Accident Spot:</strong> {area.spot}<br/>
                      <strong>Latitude:</strong> {area.LATITUDE}<br/>
                      <strong>Longitude:</strong> {area.LONGITUDE}<br/>
                      <strong>Main Cause:</strong> {area.main_cause}<br/>
                      <strong>Road Condition:</strong> {area.road_condition}<br/>
                      <strong>Severity:</strong> {area.severity}<br/>
                      <strong>Weather:</strong> {area.weather}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            } else {
              console.log('Skipping CircleMarker for area:', area); // Debug log
              return null;
            }
          })}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default Map;
