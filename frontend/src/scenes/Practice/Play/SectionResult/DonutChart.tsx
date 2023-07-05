import React from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
  DoughnutControllerDatasetOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAppSelector } from "@toolkit/hook";

export default function DonutChart() {
  const { playIndex, sectionPracticeArr } = useAppSelector(
    (state) => state.practice
  );

  const bestScore = String(sectionPracticeArr[playIndex]?.bestScore);
  const poseMessages = sectionPracticeArr[playIndex]?.poseMessages;
  // const exampleData = {
  //   Miss: 6,
  //   Good: 45,
  //   Great: 23,
  //   Excellent: 4,
  // };

  Chart.register(ArcElement, Tooltip, Legend);
  const dataValues = poseMessages && Object.values(poseMessages).reverse();

  const data = {
    labels: ["Excellent", "Great", "Good", "Miss"],
    datasets: [
      {
        labels: ["Excellent", "Great", "Good", "Miss"],
        data: dataValues,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const plugin: Plugin<"doughnut"> = {
    id: "centerText",
    beforeDraw: function (chart: Chart) {
      const { ctx } = chart;
      ctx.save();

      // scoreText 표시
      const scoreText = bestScore;
      const xCoor = chart.getDatasetMeta(0)?.data[0].x;
      const yCoor = chart.getDatasetMeta(0)?.data[0].y;
      const fontSize = (yCoor / 60).toFixed(2); // 동적 폰트사이즈 조절
      ctx.font = `bold ${fontSize}em sans-serif`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(scoreText, xCoor, yCoor * 0.95);

      // scoreText 의 높이 추출
      const metrics = ctx.measureText(scoreText);
      const actualHeight =
        metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

      // scoreText 아래에 표시
      const subText = "Score";
      const subFontSize = (yCoor / 90).toFixed(2);
      ctx.font = `${subFontSize}rem sans-serif`;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(subText, xCoor, yCoor * 0.95 + actualHeight);
    },
  };

  // 플러그인 리스트
  const plugins: Plugin<"doughnut", DoughnutControllerDatasetOptions>[] = [
    plugin,
  ];

  return (
    <>
      {dataValues ? (
        <Doughnut data={data} options={options} plugins={plugins} />
      ): <span>데이터가 없습니다.</span>}
    </>
  );
}
