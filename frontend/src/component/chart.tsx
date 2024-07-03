import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top',
    // },
  },
};

export const LineChart = () => (
  <div>
    <h2>Line Chart Example</h2>
    <Line data={data} options={options} />
  </div>
);

