import { IPractice } from "@type/practice";
import StackedBarChart from "./StackedBarChart";

export default function ScoreBoard({ data }: { data: IPractice }) {
  return (
    <div className="h-[500px] w-full rounded-md bg-background shadow-md">
      <h1>ScoreBoard</h1>
      <StackedBarChart />
    </div>
  );
}
