import Webcam from "react-webcam";

import { poseSimilarity } from "@ai/utils/posesim";
import { drawKeypoints, drawSkeleton } from "@ai/utilities";

import { IPoseMessages, TSectionId } from "@type/practice";
import { Pose as poseType } from "@type/moveNet";
import * as poseDetection from "@tensorflow-models/pose-detection";

import { postPracticeResult } from "@api/dance/postPracticeData";

export function webcamSize (webcam: HTMLVideoElement) {
  const webcamWidth = webcam.videoWidth;
  const webcamHeight = webcam.videoHeight;

  // Set video width
  webcam.width = webcamWidth;
  webcam.height = webcamHeight;

  return { webcam, webcamWidth, webcamHeight };
};

export function getCanvasContext (
  webcamWidth: number,
  webcamHeight: number,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d");
  canvas.width = webcamWidth;
  canvas.height = webcamHeight;
  return ctx;
};

export function drawCanvas(pose: poseType[], ctx: CanvasRenderingContext2D) {
  //? (keypoints, confidence_score, context)
  drawKeypoints(pose[0]["keypoints"], 0.45, ctx);
  drawSkeleton(pose[0]["keypoints"], 0.45, ctx);
};

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  ctx !== null && ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export async function detect(
  webcam: HTMLVideoElement,
  movenet_model: poseDetection.PoseDetector
) {
  try {
    const pose = (await movenet_model.estimatePoses(webcam)) as poseType[];
    if (pose.length > 0) return pose;
    else return "error";
  } catch (error) {
    return "error";
  }
};

export function scoreToMessage(score: number) {
  if (score < 60) {
    return "miss";
  } else if (score >= 60 && score < 80) {
    return "good";
  } else if (score >= 80 && score < 90) {
    return "great";
  } else {
    return "excellent";
  }
};

export async function danceableBodyCheck(
  webcamRef: React.RefObject<Webcam>,
  detector: poseDetection.PoseDetector
) {
  const bodyCheckPerSec = setInterval(async () => {
    // 댄서블의 keypoints값 추출
    const webcamTag = webcamRef.current?.video as HTMLVideoElement;
    const danceable = await detect(webcamTag, detector);

    // 모든 부위의 confidence score가 0.5이상인지 확인
    if (danceable !== "error") {
      const scores = danceable[0].keypoints.map((kp) => kp.score);
      if (scores.every((score) => score >= 0.5)) {
        clearInterval(bodyCheckPerSec);
        return true;
      }
    }
  }, 1000);
};

export async function runMovenet(
  sectionId: TSectionId,
  webcamRef: React.RefObject<Webcam>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  detector: poseDetection.PoseDetector,
  dancerJson: poseType[][],
  setPoseMessage: React.Dispatch<React.SetStateAction<string>>,
  updateCallback: (avgScore: number, poseMessages: IPoseMessages) => void
) {
  //구간의 실시간 댄서블 keypoint 점수
  const danceableJson: poseType[][] = [];

  //구간의 평균 유사도 점수
  let avgCosineDistance = 0;
  let oneMinuteCosineDistance = 0; //1분동안의 유사도 점수(miss,good,great,excellent)

  //반복문 실행
  let indx = 1;

  const postMessages: IPoseMessages = {
    miss: 0,
    good: 0,
    great: 0,
    excellent: 0,
  };

  const drawPerSec = setInterval(async () => {
    //webcam의 video tag로 width, height 추출
    const webcamTag = webcamRef.current?.video as HTMLVideoElement;
    const { webcam, webcamWidth, webcamHeight } = webcamSize(webcamTag);

    // 댄서블의 keypoint 추출
    const danceable = await detect(webcam, detector);
    const dancer = dancerJson[indx];

    // canvas에 댄서블의 스켈레톤 그리기
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = getCanvasContext(webcamWidth, webcamHeight, canvas);
    if (danceable !== "error" && ctx !== null) drawCanvas(danceable, ctx);

    //에러 안 나면 x,y의 좌표와 유사도 출력
    if (danceable !== "error" && dancer !== undefined) {
      const cosineDistance = poseSimilarity(danceable[0], dancer[0], {
        strategy: "cosineDistance",
      });
      danceableJson.push(danceable); //댄서블 실시간 keypoint 저장

      if (cosineDistance instanceof Error) {
        console.log("error");
      } else {
        oneMinuteCosineDistance += cosineDistance;

        //1초 지나면 avgCosineDistance에 더해주고 점수 메세지 출력한 뒤, oneMinuteCosineDistance 초기화
        if (indx % 15 === 0) {
          avgCosineDistance += oneMinuteCosineDistance;
          // setMessage(oneMinuteCosineDistance / 15); // 1초 동안의 유사도 평균점수 출력 //! 누적 점수가 아니다 ?????????
          const poseMessage = scoreToMessage(oneMinuteCosineDistance / 15);
          setPoseMessage(poseMessage); //! 점수에 따른 메세지만 출력하면 되지 않나?
          postMessages[poseMessage] += 1; // 동작 평가 메시지 누적
          oneMinuteCosineDistance = 0; // 1분동안의 유사도 점수 초기화
        }

        indx += 1; //다음 이미지 비교
      }
    }

    //강사 영상 끝나면 setInterval 멈춤
    if (indx === dancerJson.length) {
      clearInterval(drawPerSec);
      clearCanvas(canvas);
      avgCosineDistance /= indx - 1;

      updateCallback(avgCosineDistance, postMessages);

      // 댄서블의 keypoint와 녹화한 댄서블 영상을 POST 요청
      const practicedata = new FormData();
      practicedata.append("keypoints", JSON.stringify(danceableJson));
      // formdata.append("video", webcamRecodeFile);

      const data = {
        sectionId,
        practicedata
      };

      await postPracticeResult(data)
    }
  }, 1000 / 15); //! 15 fps
};
