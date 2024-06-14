import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, useMediaQuery, useTheme, IconButton, Dialog, DialogContent, Button, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const MapSection = ({ prediction }) => {
  const [accidentProneAreas, setAccidentProneAreas] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataLength, setDataLength] = useState(8000); // Initial data length to fetch
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchAccidentData = async (len) => {
      setLoading(true); // Set loading state to true while fetching data
      try {
        const response = await fetch('https://nutshell-api.azurewebsites.net/process_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prediction,
            len: 1000
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
      } finally {
        setLoading(false); // Set loading state to false after fetching data
      }
    };

    if (prediction) {
      fetchAccidentData(dataLength);
    }
  }, [prediction, dataLength]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadMore = () => {
    if (dataLength < 48000) {
      setDataLength((prevLength) => prevLength + 10000);
    }
  };

  return (
    <>
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
          position: 'relative',
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 1 }}>
          Map
        </Typography>
        <IconButton
          onClick={handleOpen}
          aria-label="expand-map"
          sx={{
            position: 'absolute',
            top: isMobile ? '0.5rem' : '1rem',
            right: isMobile ? '0.5rem' : '1rem',
            zIndex: 1,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <AddIcon />
        </IconButton>
        <Box sx={{ width: '100%', height: isMobile ? '30vh' : '50vh' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <MapContainer center={[15.3173, 78.4760]} zoom={6} style={{ height: '100%', width: '100%' }}>
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
                      <strong>Accident Spot:</strong> {area.spot}<br />
                      <strong>Latitude:</strong> {area.LATITUDE}<br />
                      <strong>Longitude:</strong> {area.LONGITUDE}<br />
                      <strong>Main Cause:</strong> {area.main_cause}<br />
                      <strong>Road Condition:</strong> {area.road_condition}<br />
                      <strong>Severity:</strong> {area.severity}<br />
                      <strong>Weather:</strong> {area.weather}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          )}
        </Box>
      </Box>

      <Dialog fullScreen open={open} onClose={handleClose}>
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
          <Box sx={{ width: '100%', height: 'calc(100vh - 8rem)', padding: '2rem' }}>
            <MapContainer center={[15.3173, 78.4760]} zoom={6} style={{ height: '100%', width: '100%' }}>
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
                      <strong>Accident Spot:</strong> {area.spot}<br />
                      <strong>Latitude:</strong> {area.LATITUDE}<br />
                      <strong>Longitude:</strong> {area.LONGITUDE}<br />
                      <strong>Main Cause:</strong> {area.main_cause}<br />
                      <strong>Road Condition:</strong> {area.road_condition}<br />
                      <strong>Severity:</strong> {area.severity}<br />
                      <strong>Weather:</strong> {area.weather}
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </Box>
          <Button variant="contained" color="primary" onClick={handleLoadMore} sx={{ mt: 2 }}>
            Load More Data
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MapSection;
