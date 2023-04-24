import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";
import { COLOR } from "../../contanst/global";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ labelsChart, dataChart }) {
  const options = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
        }
      },
    };
  }, []);

  const data = useMemo(() => {
    return {
      labels: labelsChart,
      datasets: [
        {
          label: "Doanh thu",
          data: dataChart,
          borderColor: COLOR.RED,
          backgroundColor: COLOR.RED,
        },
      ],
    };
  }, [labelsChart, dataChart]);

  return <Line responsive="true" options={options} data={data} />;
}

export default LineChart;
