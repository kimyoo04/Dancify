import MainLayout from "@layouts/MainLayout";
import ScoreBoard from "@scenes/Practice/Result/ScoreBoard";
import StackedBar from "@scenes/Practice/Result/StackedBarChart";
import React from "react";

export default function SignUpPage() {
  const scoreToMessage = {
    Miss: 6,
    Good: 45,
    Great: 23,
    Excellent: 4,
  };

  return (
    <MainLayout>
      <ScoreBoard scoreToMessage={scoreToMessage} />
      {/* <StackedBar /> */}
    </MainLayout>
  );
}
