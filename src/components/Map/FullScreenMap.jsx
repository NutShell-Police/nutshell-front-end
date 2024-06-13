import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, useMediaQuery, useTheme, Button, Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const FullScreenMap = () => {
  const [accidentProneAreas, setAccidentProneAreas] = useState([]);
  const [open, setOpen] = useState(true); // Initially open the full-screen map
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchAccidentData = async () => {
      try {
        const response = await fetch('https://nutshell-api.azurewebsites.net/process_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prediction: 'initial_prediction', // Replace with your initial prediction or remove if not needed
            len: 1000 // Initial data length
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

    fetchAccidentData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
    >
      <DialogContent sx={{ p: 4 }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 16, top: 16, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ width: '100%', height: 'calc(100vh - 4rem)', padding: '2rem 0' }}>
          <MapContainer center={[15.3173, 75.7139]} zoom={7} style={{ height: '100%', width: '100%' }}>
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
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenMap;
