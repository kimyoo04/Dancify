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
  IEvalPerFrame,
  IPelvis,
  IShoulder,
  IForearm,
  ILeg,
} from "@type/feedbackJson";
import { Separator } from "@components/ui/separator";

export default function LineChart({
  bestJsonData,
}: {
  bestJsonData: IEvalPerFrame[];
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  //[1,2,3,4]구역
  const labels: number[] = Array.from(
    { length: bestJsonData.length },
    (_, i) => i + 1
  );

  // 신체 부위 4가지
  const parts: (keyof IEvalPerFrame)[] = [
    "pelvis",
    "shoulder",
    "forearm",
    "leg",
  ];

  // 신체 부위별 점수
  const result: number[][] = parts.map((part) =>
    bestJsonData.flatMap(
      (dataIdx: IEvalPerFrame) =>
        (dataIdx[part] as IPelvis | IShoulder | IForearm | ILeg).score
    )
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "점수",
        },
      },
      x: {
        title: {
          display: true,
          text: "초",
        },
      },
    },
  };

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

  return (
    <div className="h-full w-full">
      <h2 className="mb-4 text-xl font-bold">신체 부위별 점수 변화 그래프</h2>
      <Separator className="mb-3" />
      <Line options={options} data={data} />
    </div>
  );
}
