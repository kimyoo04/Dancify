import React, { useRef, useEffect } from "react";
import "./styles.css";
import * as poseDetection from "@tensorflow-models/pose-detection";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgpu';

export default function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const detect = async (movenet_model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      try {
      const pose = await movenet_model.estimatePoses(video);

        //포즈 측정 성공한 경우
        if (pose.length > 0) {
          drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
          console.log(pose);
          return pose;
        }
        // 포즈 측정 실패한 경우 error return
        else{
          console.log('error');
          return 'error';

        }
      } catch (error) {
        console.log('catch error');
        return 'error';
      }
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose[0]["keypoints"], 0.5, ctx);
    drawSkeleton(pose[0]["keypoints"], 0.4, ctx);
  };



  const runPosenet = async () => {
    await tf.ready();
    const model = poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);
    setInterval(() => {
      detect(detector);
    }, 100);
  };
  runPosenet();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}