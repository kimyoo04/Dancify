import React from "react";
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
import {
  IPelvis,
  IShoulder,
  IForearm,
  ILeg,
  IEvalPerFrame,
} from "@type/feedbackJson";
import { feedback1 } from "@scenes/Test/feedbackData";

export default function FeedbackLine() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "AI 피드백 전체 그래프",
      },
    },
  };

  const feedbackData = feedback1.data;

  //[1,2,3,4]구역
  const labels: number[] = Array.from(
    { length: feedbackData.length },
    (_, i) => i + 1
  );

  const parts: (keyof IEvalPerFrame)[] = ["pelvis", "shoulder", "forearm", "leg"];
  const result: number[][] = parts.map((part) =>
    feedbackData.flatMap(
      (dataIdx: IEvalPerFrame) =>
        (dataIdx[part] as IPelvis | IShoulder | IForearm | ILeg).score
    )
  );

  const data = {
    labels,
    datasets: [
      {
        label: "골반",
        data: result[0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "어깨",
        data: result[1],
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "팔",
        data: result[2],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "다리",
        data: result[3],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
