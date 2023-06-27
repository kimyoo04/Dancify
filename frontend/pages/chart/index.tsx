import MainLayout from "@layouts/MainLayout";
import DonutChart from "@scenes/Test/DonutChart";
import StackedBarChart from "@scenes/Test/StackedBarChart";
import React from "react";

export default function ChartPage() {
  return (
    <MainLayout>
      <DonutChart />
      <StackedBarChart />
    </MainLayout>
  );
}
