import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart({ assets }) {
  const typeMap = {};

  assets.forEach(asset => {
    if (!typeMap[asset.type]) typeMap[asset.type] = 0;
    typeMap[asset.type] += asset.currentValue;
  });

  const data = {
    labels: Object.keys(typeMap),
    datasets: [
      {
        label: 'Current Value by Type',
        data: Object.values(typeMap),
        backgroundColor: [
          '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc949'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '400px', margin: '2rem auto' }}>
      <h3>📈 Portfolio Distribution</h3>
      <Pie data={data} />
    </div>
  );
}
