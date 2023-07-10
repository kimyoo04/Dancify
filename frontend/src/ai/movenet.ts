import Webcam from "react-webcam";
import React from "react";
import { poseSimilarity } from "@ai/utils/posesim";
import { drawKeypoints, drawSkeleton } from "@ai/utilities";

import { IPoseMessages, TPoseMessage } from "@type/practice";
import { Pose as poseType } from "@type/moveNet";

import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";

// 웹캠의 width, height 추출
export function getWebcamDims(webcam: HTMLVideoElement) {
  const webcamWidth = webcam.videoWidth;
  const webcamHeight = webcam.videoHeight;

  webcam.width = webcamWidth;
  webcam.height = webcamHeight;

  return { webcamWidth, webcamHeight };
}

// canvas의 ctx 추출
export function getCanvasCxt(
  webcamWidth: number,
  webcamHeight: number,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d");
  canvas.width = webcamWidth;
  canvas.height = webcamHeight;
  return ctx;
}

export function drawCanvas(pose: poseType[], ctx: CanvasRenderingContext2D) {
  //? (keypoints, confidence_score, context)
  drawKeypoints(pose[0]["keypoints"], 0.45, ctx);
  drawSkeleton(pose[0]["keypoints"], 0.45, ctx);
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  ctx !== null && ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export async function loadMoveNetDetector() {
  await tf.ready();
  const model = poseDetection.SupportedModels.MoveNet;
  const detector = await poseDetection.createDetector(model); // 모델 로드
  return detector;
}

export async function detect(
  webcam: HTMLVideoElement,
  detector: poseDetection.PoseDetector
) {
  try {
    const videoWidth = webcam.videoWidth;
    const videoHeight = webcam.videoHeight;

    // Set video width
    webcam.width = videoWidth;
    webcam.height = videoHeight;

    const pose = (await detector.estimatePoses(webcam)) as poseType[];
    // console.log(pose);
    if (pose.length > 0) return pose;
    else return "error";
  } catch (error) {
    return "error";
  }
}

export function scoreToMessage(score: number) {
  if (score < 65) {
    return "Miss";
  } else if (score >= 65 && score < 75) {
    return "Good";
  } else if (score >= 75 && score < 85) {
    return "Great";
  } else {
    return "Excellent";
  }
}

export async function danceableBodyCheck(
  webcamRef: React.RefObject<Webcam>,
  bodyCheckCallback: () => void
) {
  await tf.ready();
  const model = poseDetection.SupportedModels.MoveNet;
  const detector = await poseDetection.createDetector(model);

  const bodyCheckPerSec = setInterval(async () => {
    // 댄서블의 keypoints값 추출
    const webcam = webcamRef.current?.video;
    const danceable = webcam && (await detect(webcam, detector));

    // 모든 부위의 confidence score가 0.5이상인지 확인
    if (danceable !== "error") {
      const scores = danceable && danceable[0].keypoints.map((kp) => kp.score);
      // console.log(scores);
      if (scores && scores.every((score) => score >= 0.5)) {
        clearInterval(bodyCheckPerSec);
        console.log("🚀 전신 체크 완료");
        bodyCheckCallback();
        return true;
      }
    }
  }, 1000);
}

export async function runMovenet(
  isForceEnd: React.MutableRefObject<boolean>,
  isSkeleton: boolean,
  webcamRef: React.RefObject<Webcam>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  detector: poseDetection.PoseDetector,
  dancerJson: poseType[][],
  setPoseMessage: React.Dispatch<React.SetStateAction<TPoseMessage>>
): Promise<
  | string
  | [avgScore: number, poseMessages: IPoseMessages, keypointJson: poseType[][]]
> {
  // 구간의 실시간 댄서블 keypoint 점수
  const danceableJson: poseType[][] = [];

  // 구간의 평균 유사도 점수
  let resultScore = 0;
  let oneSecCosineDistance = 0; // 1초 동안의 keypoints 유사도 점수

  // 반복문 실행
  let indx = 0;

  // 강제 구간 종료 시 canvas error 방지
  let breakDrawing = false;

  // 각 포즈별 메세지 초기화
  const postMessages: IPoseMessages = {
    Miss: 0,
    Good: 0,
    Great: 0,
    Excellent: 0,
  };

  return new Promise((resolve) => {
    const drawPerSec = setInterval(async () => {
      //webcam의 video tag로 width, height 추출
      const webcam = webcamRef.current?.video as HTMLVideoElement;
      const { webcamWidth, webcamHeight } = webcam && getWebcamDims(webcam);

      // 댄서블의 keypoint 추출
      const danceable = await detect(webcam, detector);
      const dancer = dancerJson[indx];
      if (breakDrawing) {
        console.log("🚫 breakDrawing");
      } else {
        // canvas에 댄서블의 스켈레톤 그리기
        const canvas = canvasRef.current as HTMLCanvasElement;
        if (isSkeleton) {
          const ctx = getCanvasCxt(webcamWidth, webcamHeight, canvas);
          danceable !== "error" && ctx !== null && drawCanvas(danceable, ctx);
        }

        // 에러 안 나면 x,y의 좌표와 유사도 출력
        if (danceable !== "error" && dancer !== undefined) {
          const cosineDistance = poseSimilarity(danceable[0], dancer[0], {
            strategy: "cosineDistance",
          });
          danceableJson.push(danceable); //댄서블 실시간 keypoint 저장
          // console.log(cosineDistance);
          if (cosineDistance instanceof Error) {
            console.log(
              "🚀 movenet.ts ~ cosineDistance: error",
              cosineDistance
            );
          } else {
            oneSecCosineDistance += cosineDistance;

            //1초 지나면 avgCosineDistance에 더해주고 점수 메세지 출력한 뒤, oneSecCosineDistance 초기화
            if (indx % 15 === 0) {
              const poseMessage = scoreToMessage(oneSecCosineDistance / 15);
              setPoseMessage(poseMessage);
              postMessages[poseMessage] += 1; // 동작 평가 메시지 누적
              oneSecCosineDistance = 0; // 1초 동안의 유사도 점수 초기화
            }
            // console.log('current',indx);
            indx += 1; //다음 이미지 비교
          }
        }

        //! -------------- 리펙토링 필요 --------------
        // 강제 종료
        if (isForceEnd.current) {
          // console.log(indx);
          breakDrawing = true;
          clearInterval(drawPerSec);
          clearCanvas(canvas);
          isForceEnd.current = false;
          resolve("isForceEnd");
          // 정상적으로 끝나면 setInterval 멈춤
        } else if (indx === dancerJson.length) {
          // console.log(indx);
          breakDrawing = true;
          clearInterval(drawPerSec);
          clearCanvas(canvas);

          // 점수 계산
          const totalcnt =
            Object.values(postMessages).reduce((sum, value) => sum + value) * 3;
          resultScore =
            Math.round(
              (10000 *
                (postMessages["Good"] +
                  postMessages["Great"] * 2 +
                  postMessages["Excellent"] * 3)) /
                totalcnt
            ) / 100;
          // console.log(resultScore, postMessages);
          resolve([resultScore, postMessages, danceableJson]);
        }
      }
    }, 1000 / 15); //! 15 fps
  });
}
