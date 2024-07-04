import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export const LineChart = ({ labels, income = [], expense = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        backgroundColor: 'rgba(42,193,78,0.2)',
        borderColor: 'rgba(42,193,78,1)',
        data: income,
      },
      {
        label: 'Expenses',
        backgroundColor: 'rgba(241,80,80,0.2)',
        borderColor: 'rgba(241,80,80,1)',
        data: expense,
      },
    ],
  };
  return(
    <div className="col-xl-6">
      <div className="card">
        <div className="card-body">

          <h4 className="card-title">Monthly chart</h4>
          {/* <p className="card-subtitle mb-4">Example of line chart chart js.</p> */}

          <Line 
            data={data} 
            options={{responsive: true, plugins: { legend: { position: "center" } }}} 
          />
        </div> 
      </div>
    </div>
  )
};

