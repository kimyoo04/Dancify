import MainLayout from "@layouts/MainLayout";
import ScoreBoard from "@scenes/Practice/Result/ScoreBoard";
import StackedBar from "@scenes/Practice/Result/StackedBarChart";
import React from "react";
import { IPracticeState, IPoseMessages } from "@type/practice";

export default function SignUpPage() {
  const dummyData1 = {
    Miss: 6,
    Good: 45,
    Great: 23,
    Excellent: 4,
  };

  const dummyData2 = {
    step: "Step 1",
    playIndex: 1,
    sectionPracticeArr: [
      {
        sectionId: "Section 1",
        firstScore: 80,
        bestScore: 90,
        playCounts: 5,
        poseMessages: {
          Miss: 2,
          Good: 1,
          Great: 2,
          Excellent: 5,
        },
      },
      {
        sectionId: "Section 3",
        firstScore: 70,
        bestScore: 85,
        playCounts: 3,
        poseMessages: {
          Miss: 1,
          Good: 1,
          Great: 1,
          Excellent: 3,
        },
      },
      {
        sectionId: "Section 4",
        firstScore: 75,
        bestScore: 95,
        playCounts: 7,
        poseMessages: {
          Miss: 3,
          Good: 2,
          Great: 1,
          Excellent: 1,
        },
      },
      {
        sectionId: "Section 2",
        firstScore: 60,
        bestScore: 80,
        playCounts: 4,
        poseMessages: {
          Miss: 2,
          Good: 1,
          Great: 1,
          Excellent: 0,
        },
      },
    ],
  };

  return (
    <MainLayout>
      <ScoreBoard scoreToMessage={dummyData1 as IPoseMessages} />
      <StackedBar Practice={dummyData2 as IPracticeState} />
    </MainLayout>
  );
}
