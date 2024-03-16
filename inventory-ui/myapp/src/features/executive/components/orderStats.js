import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";

function OrderStat() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const getStats = async () => {
      const response = await axios.get(
        "http://localhost:8282/order/supplier/stats"
      );
      const documentStyle = getComputedStyle(document.documentElement);
      const data = {
        labels: response.data.labels,
        datasets: [
          {
            data: response.data.data,
            backgroundColor: [
              documentStyle.getPropertyValue("--blue-500"),
              documentStyle.getPropertyValue("--yellow-500"),
              documentStyle.getPropertyValue("--green-500"),
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue("--blue-400"),
              documentStyle.getPropertyValue("--yellow-400"),
              documentStyle.getPropertyValue("--green-400"),
            ],
          },
        ],
      };
      const options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    };
    getStats();
  }, []);

  return (
    <div className="container mt-4">
      <div className="rows">
        <div className="col-md-6">
          <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            className="w-full md:w-30rem"
            style={{ width: "50%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderStat;
