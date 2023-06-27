import { IPoseMessages } from "@type/practice";
import React from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DrawLegend = ({ scoreToMessage }: { scoreToMessage: IPoseMessages }) => {
  return (
    <div style={{ position: "absolute", top: "50px", left: "350px" }}>
      {Object.keys(scoreToMessage).map((key) => (
        <div key={key}>
          <h2 style={{ fontSize: "large", fontWeight: "bold" }}>
            {key.toUpperCase()}
          </h2>
          <p style={{ fontSize: "20px" }}>
            {scoreToMessage[key as keyof typeof scoreToMessage]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function ScoreBoard({
  scoreToMessage,
}: {
  scoreToMessage: IPoseMessages;
}) {
  Chart.register(ArcElement, Tooltip, Legend);
  const dataValues = Object.values(scoreToMessage);

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
        position: "right",
      },
    },
  };

  const plugs = [
    {
      id: "centertext",
      beforeDraw: function (chart: Chart<"doughnut">) {
        if (chart.options.centerText) {
          const width = chart.chartArea.right - chart.chartArea.left;
          const height = chart.chartArea.bottom - chart.chartArea.top;
          const ctx = chart.ctx;

          ctx.restore();
          const fontSize = (height / 80).toFixed(2);
          ctx.font = `bold ${fontSize}em sans-serif`;
          ctx.textBaseline = "middle";

          const text = chart.options.centerText;
          const textWidth = ctx.measureText(text).width;

          const textX = Math.round((width - textWidth) / 2);
          const textY = height / 2;

          ctx.fillText(text, textX, textY);

          if (chart.options.centerSubText) {
            const subText = chart.options.centerSubText;
            ctx.font = "1em sans-serif";
            const subTextWidth = ctx.measureText(subText).width;
            const subTextX = Math.round((width - subTextWidth) / 2);
            const subTextY = textY + 30;
            ctx.fillText(subText, subTextX, subTextY);
          }

          ctx.save();
        }
      },
    },
  ];

  return (
    <div style={{ position: "relative", height: "300px", width: "300px" }}>
      <h1>첫번째 구간 결과</h1>
      <Doughnut data={data} options={opt} plugins={plugs} />
      <DrawLegend scoreToMessage={scoreToMessage} />
    </div>
  );
}
