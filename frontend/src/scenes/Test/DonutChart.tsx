import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
// import { useAppSelector } from "@toolkit/hook";

export default function DonutChart() {
  // const { playIndex, sectionPracticeArr } = useAppSelector(
  //   (state) => state.practice
  // );

  // const poseMessages = sectionPracticeArr[playIndex]?.poseMessages;
  const poseMessages = {
    Miss: 6,
    Good: 45,
    Great: 23,
    Excellent: 4,
  };

  Chart.register(ArcElement, Tooltip, Legend);
  const dataValues = poseMessages && Object.values(poseMessages);

  const data = {
    labels: ["Miss", "Good", "Great", "Excellent"],
    datasets: [
      {
        labels: ["Miss", "Good", "Great", "Excellent"],
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const opt = {
    centerText: "86",
    centerSubText: "Score",
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <>{dataValues && <Doughnut data={data} options={opt} />}</>;
}
