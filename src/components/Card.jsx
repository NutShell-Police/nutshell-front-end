// Card.jsx

import React from 'react';
import { Card as MuiCard, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Card = ({ title, description, link }) => {
  return (
    <MuiCard
      sx={{
        maxWidth: 345,
        minHeight: 200,
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(5px)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Box mt={2}>
        <Button component={Link} to={link} variant="contained" color="primary">
          Explore
        </Button>
      </Box>
    </MuiCard>
  );
};

export default Card;
