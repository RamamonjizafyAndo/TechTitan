import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const labels = ["Consommation des appareils (en KWh)"];

/// XXX : ampitomboina le data set refa anisy appareil hafa
export const data = {
  labels,
  datasets: [
    {
      label: 'Appareil 1', /// XXX : Anaranle appareil 
      data: labels.map(() => 45), /// XXX : Donné anle appareil voalohany ohatra
      backgroundColor: 'rgba(255, 99, 132, 0.5)', /// TODO : Ovaina ny couleur isaky ny appareil ohatra
    },
    {
    label: 'Appareil 2', /// XXX : Anaranle appareil 
      data: labels.map(() => 45), /// XXX : Donné anle appareil hafa
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export function VerticalBarChart() {
  return <Bar options={options} data={data} />;
}