import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Dark blue
    },
    secondary: {
      main: '#B71C1C', // Red
    },
    background: {
      default: '#ffffff', // White background
    },
    text: {
      primary: '#000000', // Black text
    },
  },
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
});

export default theme;
