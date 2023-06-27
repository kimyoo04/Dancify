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

  const poseMessages = sectionPracticeArr[playIndex]?.poseMessages;
  // const exampleData = {
  //   Miss: 6,
  //   Good: 45,
  //   Great: 23,
  //   Excellent: 4,
  // };

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

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const plugin: Plugin<"doughnut"> = {
    id: "textCenter",
    beforeInit: (chart: Chart) => {
      const { ctx } = chart;

      const width = chart.chartArea.right - chart.chartArea.left;
      const height = chart.chartArea.bottom - chart.chartArea.top;

      ctx.restore();
      const fontSize = (height / 80).toFixed(2);
      ctx.font = `bold ${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";

      //! text 추가
      const text = "86";
      const textWidth = ctx.measureText(text).width;
      const textX = Math.round((width - textWidth) / 2);
      const textY = height / 2;
      ctx.fillText(text, textX, textY);

      //! text 아래에 subText 텍스트 추가
      const subText = "Score";
      ctx.font = "1em sans-serif";
      const subTextWidth = ctx.measureText(subText).width;
      const subTextX = Math.round((width - subTextWidth) / 2);
      const subTextY = textY + 30;
      ctx.fillText(subText, subTextX, subTextY);

      ctx.save();
    },
  };

  // 플러그인 리스트
  const plugins: Plugin<"doughnut", DoughnutControllerDatasetOptions>[] = [
    plugin,
  ];

  return (
    <>
      {dataValues && (
        <Doughnut data={data} options={options} plugins={plugins} />
      )}
    </>
  );
}
