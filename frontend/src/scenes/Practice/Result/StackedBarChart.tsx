import React from "react";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "@toolkit/hook";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function StackedBarChart() {
  const sectionPracticeArr = useAppSelector(
    (state) => state.practice.sectionPracticeArr
  );

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        reverse: true, // 범례 항목을 뒤집기
      },
    },
    scales: {
      x: {
        stacked: true,
        reverse: true,
        title: {
          display: true,
          text: "점수",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "구간",
        },
      },
    },
  };

  //[1,2,3,4]구역
  const labels: number[] = Array.from(
    { length: sectionPracticeArr.length },
    (_, i) => i + 1
  );

  const excellentCount: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Excellent
  );
  const greatCount: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Great
  );
  const goodCount: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Good
  );
  const missCount: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Miss
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Miss",
        data: missCount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Good",
        data: goodCount,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "Great",
        data: greatCount,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Excellent",
        data: excellentCount,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return (
    <>
      {sectionPracticeArr.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <span>결과가 없습니다.</span>
      )}
    </>
  );
}
