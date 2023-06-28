import PracticeLayout from "@layouts/PracticeLayout";
import DonutChart from "@scenes/Test/DonutChart";
import FeedbackLine from "@scenes/Test/FeedbackLine";
import FeedbackRadar from "@scenes/Test/FeedbackRadar";
import StackedBarChart from "@scenes/Test/StackedBarChart";

export default function ChartPage() {
  return (
    <PracticeLayout>
      <DonutChart />
      <StackedBarChart />
      <FeedbackLine />
      <FeedbackRadar/>
    </PracticeLayout>
  );
}
