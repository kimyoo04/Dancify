import React, { useRef, useEffect, useState } from "react";
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
  const [status, setStatus] = useState("");
  // const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     const container = containerRef.current;
  //     if (container) {
  //       const containerWidth = container.clientWidth;
  //       const video = webcamRef.current?.video as HTMLVideoElement;
  //       const canvas = canvasRef.current as HTMLCanvasElement;

  //       video.width = containerWidth;
  //       video.style.transform = "scaleX(-1)";

  //       canvas.width = containerWidth;
  //     }
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

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
      drawKeypoints(pose[0]["keypoints"], 0.45, ctx);
      drawSkeleton(pose[0]["keypoints"], 0.45, ctx);
    }
  };

  const clearCanvas = () => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const runMovenet = async (detector: poseDetection.PoseDetector) => {
    //구간의 실시간 댄서블 keypoint 점수
    const danceable_json: posetype[][] = [];

    //구간의 평균 유사도 점수
    let avgcosineDistance = 0;

    //반복문 실행
    let indx = 1;

    const intervalId = setInterval(async () => {
      const danceable = await detect(detector);
      const dancer = dancer_json[indx];

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

      if (indx == dancer_json.length) {
        //강사 영상 끝나면 setInterval 멈춤
        clearInterval(intervalId);
        clearCanvas();
        setStatus("완료");

        console.log(danceable_json);

        avgcosineDistance /= indx - 1;
        console.log("평균 유사도 점수:", avgcosineDistance);
      }
    }, 1000 / 15); //15fps
    // Clean up the interval when the component unmounts
  };

  //게임 시작 전 몸 전체가 나오는지 확인
  const dance_start = async () => {
    await tf.ready();

    //모델 로드
    const model = await poseDetection.SupportedModels.MoveNet;
    const detector = await poseDetection.createDetector(model);
    const check_state = setInterval(async () => {
      const precheck = await detect(detector);
      let check = false;
      if (precheck !== "error") {
        const scores = precheck[0].keypoints.map((keypoint) => keypoint.score);
        // console.log(scores);

        //모든 부위의 confidence score가 0.5이상이어야 함
        if (scores.every((score) => score >= 0.5)) {
          check = true;
        } else {
          setStatus("아직 준비 안 됨");
        }
      } else {
        console.log("에러 발생");
      }
      if (check) {
        clearInterval(check_state); //precheck 중지
        clearCanvas(); //캔버스 지우기
        setStatus("준비 완료, 5초 뒤 시작됩니다.");
        setTimeout(() => {
          setStatus("시작");
          runMovenet(detector); //연습 시작
        }, 5000);
      }
    }, 1000);
  };

  useEffect(() => {
    dance_start();
  }, []);

  return (
    <div className="col-center fixed h-screen w-screen">
      <header>
        <Webcam
          mirrored={true}
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
            transform: "scaleX(-1)",
            flex: 1,
          }}
        />
      </header>

      <footer style={{ position: "fixed", bottom: 0 }}>
        {status && <div style={{ fontSize: "300%" }}>{status}</div>}
      </footer>
    </div>
  );
}
