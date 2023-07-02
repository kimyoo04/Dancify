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
import { IAverageScore } from "@type/feedbackJson";
import { Separator } from "@components/ui/separator";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({
  firstScores,
  bestScores,
}: {
  firstScores: IAverageScore;
  bestScores: IAverageScore;
}) {
  const values1: number[] = Object.values(firstScores);
  const values2: number[] = Object.values(bestScores);

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

  return (
    <div className="h-full w-full">
      <h2 className="mb-4 text-xl font-bold">평균 점수</h2>
      <Separator className="mb-3" />
      <Radar data={data} />
    </div>
  );
}
