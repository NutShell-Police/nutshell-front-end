import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MapSection = ({ prediction }) => {
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

  const handleMapClick = () => {
    navigate('/map', { state: { prediction } });
  };

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
        mx: 'auto',
        cursor: 'pointer'
      }}
      onClick={handleMapClick}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 1 }}>
        Map
      </Typography>
      <Box sx={{ width: '100%', height: isMobile ? '30vh' : '50vh' }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {accidentProneAreas.map((area, index) => (
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
          ))}
        </MapContainer>
      </Box>
    </Box>
  );
};

export default MapSection;
