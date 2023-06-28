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
import { feedback1, feedback2 } from "@scenes/Test/feedbackData";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function FeedbackRadar() {
  // feedback1=최초, feedback=최고
  const feedbackData1 = feedback1.avg_score;
  const feedbackData2 = feedback2.avg_score;

  const values1: number[] = Object.values(feedbackData1);
  const values2: number[] = Object.values(feedbackData2);

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
