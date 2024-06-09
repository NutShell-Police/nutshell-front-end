import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import VideoUploadPage from './pages/VideoUploadPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/upload-video" element={<VideoUploadPage />} />
    </Routes>
  );
}

export default App;
