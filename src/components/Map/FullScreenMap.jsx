
//components/Map/FullScreenMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const FullScreenMap = () => {
  const location = useLocation();
  const { prediction } = location.state || {};
  const [accidentProneAreas, setAccidentProneAreas] = useState([]);

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
          console.log('Fetched accident-prone areas:', data);
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

  return (
    <Box sx={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <div style={{ height: 'calc(100vh - 2rem - 12em)' }}>
        <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {accidentProneAreas.map((area, index) => {
            if (typeof area.LATITUDE === 'number' && typeof area.LONGITUDE === 'number' && area.LATITUDE !== 0 && area.LONGITUDE !== 0) {
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
                      <strong>Latitude:</strong> {area.LATITUDE.toFixed(6)}<br/>
                      <strong>Longitude:</strong> {area.LONGITUDE.toFixed(6)}<br/>
                      <strong>Main Cause:</strong> {area.main_cause || 'N/A'}<br/>
                      <strong>Road Condition:</strong> {area.road_condition || 'N/A'}<br/>
                      <strong>Severity:</strong> {area.severity || 'N/A'}<br/>
                      <strong>Weather:</strong> {area.weather || 'N/A'}<br/>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>
    </Box>
  );
};

export default FullScreenMap;
