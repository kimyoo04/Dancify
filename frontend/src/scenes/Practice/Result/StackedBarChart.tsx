import React from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "@toolkit/hook";
import { IPracticeState, ISectionPractice } from "@type/practice";

export default function StackedBar({ Practice }: { Practice: IPracticeState }) {
  // const sectionPracticeArr = useAppSelector(
  //   (state) => state.practice.sectionPracticeArr
  // );

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
      },
      title: {
        display: true,
        text: "연습 결과",
      },
    },
    scales: {
      x: {
        stacked: true,
        reverse: true,
      },
      y: {
        stacked: true,
        position: "right",
      },
    },
  };

  const sectionPracticeArr = Practice.sectionPracticeArr;

  //[1,2,3,4]구역
  const labels: number[] = Array.from(
    { length: sectionPracticeArr.length },
    (_, i) => i + 1
  );

  const Miss: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Miss
  );
  const Good: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Good
  );
  const Great: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Great
  );
  const Excellent: number[] = labels.map(
    (i) => sectionPracticeArr[i - 1].poseMessages.Excellent
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Miss",
        data: Miss,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "Good",
        data: Good,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
      {
        label: "Great",
        data: Great,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Excellent",
        data: Excellent,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  const DrawLegend = ({
    sectionPracticeArr,
  }: {
    sectionPracticeArr: ISectionPractice[];
  }) => {
    const labels = Object.keys(sectionPracticeArr);

    return (
      <div style={{ position: "absolute", top: "50px", left: "350px" }}>
        {labels.map((key) => (
          <div key={key}>
            <h2 style={{ fontSize: "large", fontWeight: "bold" }}>{key}구역</h2>
            <p style={{ fontSize: "20px" }}>
              {sectionPracticeArr[key].bestScore}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ position: "relative", height: "800px", width: "800px" }}>
      <Bar options={options} data={data} />
      <DrawLegend
        sectionPracticeArr={sectionPracticeArr as ISectionPractice[]}
      />
    </div>
  );
}
