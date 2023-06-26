import React, { useRef, useEffect, useState } from "react";
import { Pose as posetype } from "@type/moveNet";
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

  const runMovenet = async (
    webcamRef: React.RefObject<Webcam>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    detector: poseDetection.PoseDetector,
    dancer_json: posetype[][]
  ) => {
    //구간의 실시간 댄서블 keypoint 점수
    const danceable_json: posetype[][] = [];

    //구간의 평균 유사도 점수
    let avgCosineDistance = 0;
    let oneMinuteCosineDistance = 0; //1분동안의 유사도 점수(miss,good,great,excellent)

    //반복문 실행
    let indx = 1;

    const drawPerSec = setInterval(async () => {
      //webcam의 video tag로 width, height 추출
      const webcamTag = webcamRef.current?.video as HTMLVideoElement;
      const { webcam, webcamWidth, webcamHeight } = webcamSize(webcamTag);

      // 댄서블의 keypoint 추출
      const danceable = await detect(webcam, detector);
      const dancer = dancer_json[indx];

      // canvas에 댄서블의 스켈레톤 그리기
      const canvas = canvasRef.current as HTMLCanvasElement;
      const ctx = getCanvasContext(webcamWidth, webcamHeight, canvas);
      if (danceable !== "error" && ctx !== null) drawCanvas(danceable, ctx);

      //에러 안 나면 x,y의 좌표와 유사도 출력
      if (danceable !== "error" && dancer !== undefined) {
        const cosineDistance = poseSimilarity(danceable[0], dancer[0], {
          strategy: "cosineDistance",
        });
        danceable_json.push(danceable); //댄서블 실시간 keypoint 저장

        if (cosineDistance instanceof Error) {
          console.log("error");
        } else {
          oneMinuteCosineDistance += cosineDistance;

          //1초 지나면 avgCosineDistance에 더해주고 점수 메세지 출력한 뒤, oneMinuteCosineDistance 초기화
          if (indx % 15 === 0) {
            avgCosineDistance += oneMinuteCosineDistance;
            setAvgScore(oneMinuteCosineDistance / 15); // 1초 동안의 유사도 평균점수 출력
            oneMinuteCosineDistance = 0;
          }
          //다음 이미지 비교
          indx += 1;
        }
      }

      //강사 영상 끝나면 setInterval 멈춤
      if (indx == dancer_json.length) {
        clearInterval(drawPerSec);
        clearCanvas(canvas);
        setisFinished(true);
        avgCosineDistance /= indx - 1;
        dispatch(practiceActions.bestScore(avgCosineDistance));
      }
    }, 1000 / 15); //! 15 fps
  };

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
