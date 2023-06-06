import AuthLayout from "@layouts/AuthLayout";
import React from "react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function SignUpPage() {
  return (
    <AuthLayout>
      <Webcam />
      <ReactPlayer
        className="react-player fixed-bottom"
        url="/video/airport.mp4"
        width="100%"
        height="100%"
        controls={true}
      />
    </AuthLayout>
  );
}
