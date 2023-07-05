import DonutChart from "./DonutChart";

export default function ScoreBoard() {
  return (
    <section className="h-[500px] w-full rounded-md bg-background p-6 shadow-md dark:bg-white lg:h-[550px]">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">동작 평가 결과</h2>
        <p className="text-sm text-muted-foreground">
          최고 점수인 경우에만 갱신됩니다.
        </p>
      </div>
      <div className="col-center h-full w-full">
        <DonutChart />
      </div>
    </section>
  );
}
