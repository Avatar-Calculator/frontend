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
import { Line } from "react-chartjs-2";

import { timeseriesUnitInterface } from "@utils/DTO";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  title: string;
  timeseries: timeseriesUnitInterface[];
};

function Chart(props: Props) {
  for (let index in props.timeseries) {
    props.timeseries[index].createdAt = new Date(
      props.timeseries[index].createdAt
    );
  }
  const labels = props.timeseries.map(
    (el) =>
      el.createdAt.getHours() +
      ":" +
      String(el.createdAt.getMinutes()).padStart(2, "0")
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Floor Price",
        data: props.timeseries.map((el) => el.floor_price),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Last Sale",
        data: props.timeseries.map((el) => el.last_sale),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line options={options} data={data} />
    </div>
  );
}

export default Chart;
