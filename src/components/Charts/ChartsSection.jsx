

// src/components/charts/ChartsSection.js
import React, { useEffect, useState } from 'react';
import 'chart.js/auto'; // Import the complete Chart.js bundle
import BarChart from './Bargraph';
import LineChart from './LineGraph';
import PieChart from './Piechart';

const ChartsSection = ({ prediction }) => {
  const [yearData, setYearData] = useState([]);
  const [accidentSpotData, setAccidentSpotData] = useState([]);
  const [collisionTypeData, setCollisionTypeData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [mainCauseData, setMainCauseData] = useState([]);
  const [laneTypeData, setLaneTypeData] = useState([]);
  const [roadTypeData, setRoadTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(10);

  // Function to fetch data from API based on column name
  const fetchData = async (column, setter) => {
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
        setter(data[column]); // Assuming API response structure { column: { ...data } }
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
      fetchData('Year', setYearData);
      fetchData('Accident_Spot', setAccidentSpotData);
      fetchData('Collision_Type', setCollisionTypeData);
      fetchData('Weather', setWeatherData);
      fetchData('Main_Cause', setMainCauseData);
      fetchData('Lane_Type', setLaneTypeData);
      fetchData('Road_Type', setRoadTypeData);
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
        borderWidth: 1,
      },
    ],
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <BarChart data={prepareChartData(yearData, 'Accident Spot Data', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)')} 
          title="Yearly Data" 
          xAxisTitle="Year"
          yAxisTitle="Number of Accidents"
      />
          <LineChart data={prepareChartData(accidentSpotData, 'Number of Accidents', 'rgba(75,192,192,0.2)', 'rgba(75,192,192,1)')} 
          title="Accident Spot Data" 
          xAxisTitle="Accident spot"
          yAxisTitle="Number of Accidents"/>
          <BarChart data={prepareChartData(collisionTypeData, 'Accident Spot Data', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)')} 
          title="Collision Type Data" 
          xAxisTitle="Collision Type"
          yAxisTitle="Number of Accidents"/>
          <BarChart data={prepareChartData(weatherData, 'Accident Spot Data', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)')} 
          title="Weather Data" 
          xAxisTitle="Weather type"
          yAxisTitle="Number of Accidents"/>
          <PieChart data={prepareChartData(mainCauseData, 'Collision Type Data', ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'], ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'])} title="Main Cause Data" />
          <BarChart data={prepareChartData(laneTypeData, 'Accident Spot Data', 'rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 1)')} 
          title="Lane Type Data" 
          xAxisTitle="Lane type"
          yAxisTitle="Number of Accidents"/>
          <LineChart data={prepareChartData(roadTypeData, 'Number of Accidents', 'rgba(75,192,192,0.2)', 'rgba(75,192,192,1)')} 
          title="Road Type Data" 
          xAxisTitle="Road type"
          yAxisTitle="Number of Accidents"/>
        </div>
      )}
    </div>
  );
};

export default ChartsSection;
