import MainLayout from "@layouts/MainLayout";
import FeedbackLine from "@scenes/Practice/Result/FeedbackLine";
import FeedbackRadar from "@scenes/Practice/Result/FeedbackRadar";
import React from "react";

export default function SignUpPage() {
  return (
    <MainLayout>
      <FeedbackLine />
      <FeedbackRadar />
    </MainLayout>
  );
}
