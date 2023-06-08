// 모델 로드
const detectorConfig = { modelType: 'movenet' };
const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

// 웹캠에서 자세 감지
const runPoseDetection = async () => {
  const webcamElement = document.getElementById('webcam');
  const poses = await detector.estimatePoses(webcamElement); // 웹캠에서 자세 추정

  // 추정된 자세 정보 사용
  for (const pose of poses) {
    console.log(pose);
  }
};

// 웹페이지가 로드되면 자세 감지 실행
window.onload = () => {
  runPoseDetection().catch(console.error);
};
