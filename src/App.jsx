import React from 'react';
import { Box, Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VideoUploadPage from './pages/VideoUploadPage';
import Header from './components/Header';
import Footer from './components/Footer';
import FullScreenMap from './components/Map/FullScreenMap';
import StreamlitComponent from './components/Detection';
import { Analytics } from '@vercel/analytics/react';
import PowerBiReport from './components/PowerBi';
import Chatbot from './components/Chatbot'; // Import the Chatbot component

function App() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Container
          component="main"
          sx={{
            flex: 1,
            py: 4,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/upload-video" element={<VideoUploadPage />} />
            <Route path="/map" element={<FullScreenMap />} />
            <Route path="/detection" element={<StreamlitComponent />} />
            <Route path="/report" element={<PowerBiReport />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
      <Chatbot /> {/* Add the Chatbot component here */}
      <Analytics />
    </>
  );
}

export default App;

