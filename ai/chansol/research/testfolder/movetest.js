import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';

// 모델 로드
const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

// 웹캠에서 자세 감지
const runPoseDetection = async () => {
  const webcamElement = document.getElementById('webcam');

  // 웹캠 스트림 가져오기
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
      var videoElement = document.getElementById('videoElement');
      videoElement.srcObject = stream;
  })
  .catch(function(error) {
      console.error('웹캠을 가져올 수 없습니다:', error);
  });
  webcamElement.srcObject = stream;

  const estimatePoses = async () => {
    const poses = await detector.estimatePoses(webcamElement); // 웹캠에서 자세 추정

    // 추정된 자세 정보 사용
    for (const pose of poses) {
      console.log(pose);
    }
    requestAnimationFrame(estimatePoses);
  };
  await detector.waitForModelLoading();
  estimatePoses();
};
// 웹페이지가 로드되면 자세 감지 실행
window.onload = () => {
  runPoseDetection().catch(console.error);
};
