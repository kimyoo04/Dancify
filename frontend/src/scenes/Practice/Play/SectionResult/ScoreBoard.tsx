import DonutChart from "./DonutChart";

export default function ScoreBoard() {
  return (
    <section className="h-[500px] w-full rounded-md bg-background p-6 shadow-md dark:bg-white">
      <h1 className="text-xl font-medium">동작 평가 결과</h1>
      <div className="w-full h-full col-center">
        <DonutChart />
      </div>
    </section>
  );
}
