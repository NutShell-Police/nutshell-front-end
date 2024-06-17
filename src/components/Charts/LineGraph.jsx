// src/components/charts/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph= ({ data, title ,xAxisTitle, yAxisTitle }) => {
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

  return <Line data={data} options={chartOptions} />;
};

export default LineGraph;
