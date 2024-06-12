
//App.jsx
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VideoUploadPage from './pages/VideoUploadPage';
import Header from './components/Header';
import Footer from './components/Footer';
import FullScreenMap from './components/Map/FullScreenMap'; // Import the FullScreenMap component

function App() {
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ my: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/upload-video" element={<VideoUploadPage />} />
            <Route path="/map" element={<FullScreenMap />} />
          </Routes>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default App;

