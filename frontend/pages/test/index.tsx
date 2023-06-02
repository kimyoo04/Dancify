import AuthLayout from "@layouts/AuthLayout";
import React from "react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function SignupPage() {
  return (
    <AuthLayout>
      <Webcam />
      <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
    </AuthLayout>
  );
}
