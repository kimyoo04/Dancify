import DonutChart from "./DonutChart";

export default function ScoreBoard() {
  return (
    <section className="h-[500px] w-full rounded-md bg-background p-6 shadow-md dark:bg-white">
      <h1>ScoreBoard</h1>
      <div className="w-full h-full col-center">
        <DonutChart />
      </div>
    </section>
  );
}
