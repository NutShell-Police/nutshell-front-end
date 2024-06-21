import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import Card from '../components/Card';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Nunito, sans-serif',
        textAlign: 'center',
        padding: '15px',
      }}
    >
      <Typography variant="h2" fontWeight="800" color="text.primary" 
      sx={{ 
        mb: 2 ,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      }}>
        Project Nutshell
      </Typography>
      <Typography
        variant="h3"
        fontWeight="800"
        sx={{
          mb: 1,
          fontFamily: 'Roboto, sans-serif',
          backgroundImage: 'linear-gradient(90deg, rgba(6,0,116,1) 0%, rgba(9,9,121,1) 35%, rgba(0,88,185,1) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)', 
        }}
      >
        P A A R
      </Typography>
      <Typography
        variant="h6"
        fontWeight="400"
        sx={{
          fontFamily: 'Roboto, sans-serif',
          color: 'text.secondary',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          mb: 2
        }}
      >
        PAAR (to see) /paːr/
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Predict - Alert - Analyze - Report
      </Typography>
      {/* <Typography variant="body1" sx={{ mb: 4 }}>
        When an accident occurs, our system will Predict (P in PAAR) the accident from live CCTV footage and Alert officials (A in PAAR) through Email notification and Call feature, Analyze Accidents (A in PAAR) from past data with the help of Modern Integration of AI tools such as Google Gemini AI, visualizing it with AI Description, Charts and AI summations, and Accident spots pinpointed on the MAP. Finally, we have integrated PowerBI to generate Report and download with a click of a button.
      </Typography> */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            title="Predict"
            description="Detect accidents using live CCTV footage."
            link="/prediction"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            title="Alert"
            description="Alert officials via Email and Calls."
            link="/prediction"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            title="Analyze"
            description="Analyze accident data using AI tools like Google Gemini."
            link="/analysis"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card
            title="Report"
            description="Generate reports with integrated PowerBI."
            link="/report"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
