import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Pie } from "react-chartjs-2";

const Income = ({ data }) => {
  return (
    <>
    <Pie
      data={{
        labels: data.labels,
        datasets: [
          {
            label: "Ingresos",
            data: data.datasets,
            backgroundColor: [
              "rgba(86, 50, 168, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(129, 50, 168, 0.2)",
              "rgba(204, 49, 201, 0.2)",
              "rgba(209, 52, 76, 0.2)",
              "rgba(55, 28, 255, 0.2)",
            ],

            borderColor: [
              "rgba(86, 50, 168, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(129, 50, 168, 1)",
              "rgba(204, 49, 201, 1)",
              "rgba(209, 52, 76, 1)",
              "rgba(55, 28, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
    </>
  );
};

export default Income;
