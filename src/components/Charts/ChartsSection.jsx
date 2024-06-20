import React, { useEffect, useState } from 'react';
import 'chart.js/auto'; // Import the complete Chart.js bundle
import { Grid, Typography, Box } from '@mui/material'; // Import Box and Typography from MUI
import BarChart from './Bargraph';
import LineChart from './LineGraph';
import PieChart from './Piechart';
import axios from "axios";


const fetchDescription = async (data) => {
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: `Analyze the following dataset and provide a summary in 100 words. The dataset contains information on various factors vs the number of accidents that occurred. Focus on identifying key trends, patterns, and any significant insights from the data: ${JSON.stringify(data)}`          
          },

        ],
      },
    ],
  };
  try {
    const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

    if (response.data?.candidates && response.data.candidates.length > 0) {
      const result = await response.data.candidates[0].content.parts[0].text;
      // console.log(result);
      return result; // Assuming the API response contains a 'description' field
    } else {
      console.error(
        "Failed to fetch description. Server responded with status:",
        response.status
      );
      return "Description not available.";
    }
  } catch (error) {
    console.error('Error fetching description:', error);
    return 'Description not available due to an error.';
  }
};

const ChartsSection = ({ prediction }) => {
  const [yearData, setYearData] = useState([]);
  const [yearDesc, setYearDesc] = useState('');
  const [accidentSpotData, setAccidentSpotData] = useState([]);
  const [accidentSpotDesc, setAccidentSpotDesc] = useState('');
  const [collisionTypeData, setCollisionTypeData] = useState([]);
  const [collisionTypeDesc, setCollisionTypeDesc] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [weatherDesc, setWeatherDesc] = useState('');
  const [mainCauseData, setMainCauseData] = useState([]);
  const [mainCauseDesc, setMainCauseDesc] = useState('');
  const [laneTypeData, setLaneTypeData] = useState([]);
  const [laneTypeDesc, setLaneTypeDesc] = useState('');
  const [roadTypeData, setRoadTypeData] = useState([]);
  const [roadTypeDesc, setRoadTypeDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(10);
  

  // Function to fetch data from API based on column name
  const fetchData = async (column, setter, Descsetter) => {
    setLoading(true);
    try {
      const response = await fetch('https://nutshell-api.azurewebsites.net/get_column_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prediction,
          column_name: column,
          len: dataLength,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const desc = await fetchDescription(data);
        setter(data[column]); // Assuming API response structure { column: { ...data } }

        Descsetter(desc);
      } else {
        console.error(`Failed to fetch ${column} data. Server responded with status:`, response.status);
      }
    } catch (error) {
      console.error(`Error fetching ${column} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data on component mount and whenever prediction or dataLength changes
  useEffect(() => {
    if (prediction) {
      fetchData('Year', setYearData, setYearDesc);
      fetchData('Accident_Spot', setAccidentSpotData, setAccidentSpotDesc);
      fetchData('Collision_Type', setCollisionTypeData, setCollisionTypeDesc);
      fetchData('Weather', setWeatherData, setWeatherDesc);
      fetchData('Main_Cause', setMainCauseData, setMainCauseDesc);
      fetchData('Lane_Type', setLaneTypeData, setLaneTypeDesc);
      fetchData('Road_Type', setRoadTypeData, setRoadTypeDesc);
    }
  }, [prediction, dataLength]);

  // Function to prepare chart data based on fetched data
  const prepareChartData = (data, label, backgroundColor, borderColor) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label,
        data: Object.values(data),
        backgroundColor,
        borderColor,
        borderWidth: 2,
        
      },
    ],
  });

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 2,
        boxShadow: 1,
        bgcolor: 'background.paper',
        width: '100%',
        mx: 'auto',
        p: 2,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Charts
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <BarChart
              data={prepareChartData(
                yearData,
                "Accident Spot Data",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 1)"
              )}
              title="Yearly Data"
              xAxisTitle="Year"
              yAxisTitle="Number of Accidents"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{yearDesc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{accidentSpotDesc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <LineChart
              data={prepareChartData(
                accidentSpotData,
                "Number of Accidents",
                "rgba(75,192,192,0.2)",
                "rgba(75,192,192,1)"
              )}
              title="Accident Spot Data"
              xAxisTitle="Accident spot"
              yAxisTitle="Number of Accidents"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <LineChart
              data={prepareChartData(
                roadTypeData,
                "Number of Accidents",
                "rgba(75,192,192,0.2)",
                "rgba(75,192,192,1)"
              )}
              title="Road Type Data"
              xAxisTitle="Road type"
              yAxisTitle="Number of Accidents"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{roadTypeDesc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{collisionTypeDesc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <BarChart
              data={prepareChartData(
                collisionTypeData,
                "Accident Spot Data",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 1)"
              )}
              title="Collision Type Data"
              xAxisTitle="Collision Type"
              yAxisTitle="Number of Accidents"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <BarChart
              data={prepareChartData(
                weatherData,
                "Accident Spot Data",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 1)"
              )}
              title="Weather Data"
              xAxisTitle="Weather type"
              yAxisTitle="Number of Accidents"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{weatherDesc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{laneTypeDesc}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <BarChart
              data={prepareChartData(
                laneTypeData,
                "Accident Spot Data",
                "rgba(54, 162, 235, 0.2)",
                "rgba(54, 162, 235, 1)"
              )}
              title="Lane Type Data"
              xAxisTitle="Lane type"
              yAxisTitle="Number of Accidents"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <PieChart
              data={prepareChartData(
                mainCauseData,
                "Main Cause Data",
                [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                ],
                [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ]
              )}
              title="Main Cause Data"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ p: 2, boxShadow: 3, borderRadius: 2, height: '100%' }}
          >
            <Typography>{mainCauseDesc}</Typography>
          </Box>
        </Grid>
        {loading && (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Loading...
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ChartsSection;
