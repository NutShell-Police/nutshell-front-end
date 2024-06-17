// src/main.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css'; // Ensure this is imported to apply the global styles

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
});

// Find the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app using the createRoot method
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
