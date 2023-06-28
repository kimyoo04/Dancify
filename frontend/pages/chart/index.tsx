import MainLayout from "@layouts/MainLayout";
import DonutChart from "@scenes/Test/DonutChart";
import StackedBarChart from "@scenes/Test/StackedBarChart";
import FeedbackLine from "@scenes/Practice/Result/FeedbackLine";
import FeedbackRadar from "@scenes/Practice/Result/FeedbackRadar";
        
export default function ChartPage() {
  return (
    <MainLayout>
      <DonutChart />
      <StackedBarChart />
      <FeedbackLine />
      <FeedbackRadar />
    </MainLayout>
  );
}
