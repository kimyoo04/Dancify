import React, { useRef } from "react";
import "./styles.css";
import * as poseDetection from "@tensorflow-models/pose-detection";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import { poseSimilarity } from "./utils/posesim";
import {dancer_json} from './dancer_json_list';

import * as tf from '@tensorflow/tfjs';

export default function App() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detect = async (movenet_model: poseDetection.PoseDetector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null && webcamRef.current.video !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video as HTMLVideoElement;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width
      video.width = videoWidth;
      video.height = videoHeight;

      // Make Detections
      try {
        const pose = await movenet_model.estimatePoses(video);

          //포즈 측정 성공한 경우
          if (pose.length > 0) {
            drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
            // console.log(pose);
            return pose;
          }
          // 포즈 측정 실패한 경우 error return
          else{
            // console.log('error');
            return "error";

          }
        } catch (error) {
          // console.log('catch error');
          return "error";
        }
    }
    else {return "error";}
  };

  const drawCanvas = (
    pose: poseDetection.Pose[],
    video: HTMLVideoElement,
    videoWidth: number,
    videoHeight: number,
    canvas: React.RefObject<HTMLCanvasElement>
  ) => {
    const ctx = canvas.current!.getContext("2d")!;
    canvas.current!.width = videoWidth;
    canvas.current!.height = videoHeight;

    //(keypoints, confidence_score, canvas)
    drawKeypoints(pose[0]["keypoints"], 0.5, ctx);
    drawSkeleton(pose[0]["keypoints"], 0.4, ctx);
  };

  const runPosenet = async () => {

    const model = await poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);
    await tf.ready();

    let indx = 0;

    setInterval(async () => {
      const dancable = await detect(detector);
      const dancer = dancer_json[indx];

      console.log('------------------------')
      console.log(indx);
      //에러 안 나면 x,y의 좌표와 유사도 출력
      if (dancable!=='error' && dancer !== undefined){
      console.log('dancable', dancable[0]);
      console.log('dancer', dancer[0]);
      const weightedDistance = poseSimilarity(dancable[0], dancer[0]);
      console.log(weightedDistance);
      }
      //에러 나면 error 출력
      else {
        console.log('error')
      }
      //다음 이미지 비교
      indx += 60;
    }, 2000); //30FPS
    // Clean up the interval when the component unmounts
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
            zIndex: 9,
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
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}