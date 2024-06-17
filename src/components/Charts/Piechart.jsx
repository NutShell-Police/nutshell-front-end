// src/components/charts/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const Piechart = ({ data, title }) => {
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
  };

  return <Pie data={data} options={chartOptions} />;
};

export default Piechart;
