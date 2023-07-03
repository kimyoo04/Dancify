import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { FeedbackJsonData } from "@type/feedbackJson";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function FeedbackRadar({firstJsonData, bestJsonData}: {firstJsonData: FeedbackJsonData, bestJsonData: FeedbackJsonData}) {
  const values1: number[] = Object.values(firstJsonData);
  const values2: number[] = Object.values(bestJsonData);

  const labels = ["골반", "어깨", "팔", "다리"];

  const data = {
    labels,
    datasets: [
      {
        label: "최초 점수",
        data: values1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "최고 점수",
        data: values2,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    ],
  };
  return <Radar data={data} />;
}
