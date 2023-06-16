import React, { useRef } from "react";
import { Pose as posetype } from "./utils/types";
import Webcam from "react-webcam";
import * as poseDetection from "@tensorflow-models/pose-detection";

import { drawKeypoints, drawSkeleton } from "./utilities";
import { poseSimilarity } from "./utils/posesim";
import { dancer_json } from "./dancer_json_list";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

export default function Test() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detect = async (movenet_model: poseDetection.PoseDetector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null &&
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
        const pose = (await movenet_model.estimatePoses(video)) as posetype[];
        // console.log(pose);

        //포즈 측정 성공한 경우
        if (pose.length > 0) {
          drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
          // console.log(pose);
          return pose;
        }
        // 포즈 측정 실패한 경우 error return
        else {
          // console.log('error');
          return "error";
        }
      } catch (error) {
        // console.log('catch error');
        return "error";
      }
    } else {
      return "error";
    }
  };

  const drawCanvas = (
    pose: posetype[],
    video: HTMLVideoElement,
    videoWidth: number,
    videoHeight: number,
    canvas: React.RefObject<HTMLCanvasElement>
  ) => {
    if (!canvas || !canvas.current) return;

    const ctx = canvas.current.getContext("2d");
    if (!ctx) return;

    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    if (pose[0].score) {
      //(keypoints, confidence_score, canvas)
      drawKeypoints(pose[0]["keypoints"], 0.3, ctx);
      drawSkeleton(pose[0]["keypoints"], 0.3, ctx);
    }
  };

  const runPosenet = async () => {
    await tf.ready();
    //모델 로드
    const model = await poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);

    //구간의 실시간 댄서블 keypoint 점수
    const danceable_json: posetype[][] = [];

    //구간의 평균 유사도 점수
    let avgcosineDistance = 0;

    //반복문 실행
    let indx = 1;

    const intervalId = setInterval(async () => {
      const danceable = await detect(detector);
      const dancer = dancer_json[indx];

      console.log("------------------------");
      console.log(indx);
      //에러 안 나면 x,y의 좌표와 유사도 출력
      if (danceable !== "error" && dancer !== undefined) {
        console.log("danceable", danceable[0]);
        console.log("dancer", dancer[0]);
        const cosineDistance = poseSimilarity(danceable[0], dancer[0]);
        console.log(cosineDistance);
        danceable_json.push(danceable); //댄서블 실시간 keypoint 저장

        if (cosineDistance instanceof Error) {
          console.log("error");
          // 오류 처리
        } else {
          avgcosineDistance += cosineDistance;
          //다음 이미지 비교
          indx += 1;
        }
      }
      //에러 나면 error 출력
      else {
        console.log("error");
      }

      if (indx == dancer_json.length) {
        //강사 영상 끝나면 setInterval 멈춤
        clearInterval(intervalId);
        console.log("완료");

        console.log(danceable_json);

        avgcosineDistance /= indx - 1;
        console.log("평균 유사도 점수:", avgcosineDistance);
      }
    }, 1000 / 15); //15fps
    // Clean up the interval when the component unmounts
  };

  runPosenet();

  return (
    <div className="col-center fixed h-screen w-screen">
      <header>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: 100,
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
            top: 100,
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
