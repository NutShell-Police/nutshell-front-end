// src/components/charts/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Bargraph = ({ data, title ,xAxisTitle, yAxisTitle}) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisTitle,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisTitle,
        },
      },
    },
  };

  return <Bar data={data} options={chartOptions} />;
};

export default Bargraph;
