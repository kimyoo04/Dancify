# 필기 노트 3

## GPoleto27/Movenet_Webcam_App 🏫 [link](https://github.com/GPoleto27/Movenet_Webcam_App)
- Python 기반 코드
- 위 링크의 `README.md`에서 `git clone`한 후, `movenet.py`를 수정
- `original.py`가 원작자의 파일
- COCO Topology 기반 17개 keypoint를 추론
- 현재 point로 keypoint를 찍고, 이 point는 RGB 코드를 통해 색상 변경 가능
- 스켈레톤을 원한다면, keypoint를 튜플로 엮어 line을 생성할 수 있음

---
## smaranjitghose/MoveNet 🏫 [link](https://github.com/smaranjitghose/MoveNet)
- `GPoleto27/Movenet_Webcam_App`에서 이미 Movenet을 구현했기 때문에 따로 중점을 두지 않음
- 실제 코드는 `moviepy`에서 계속해서 ImportError가 떠서 일단 더이상 문제해결을 하려하지 않고 보류

---
## AIhomeTraining_web 🏫 [link](https://github.com/jokj624/AIhomeTraining_web)
- 운동 포즈 추론 프로젝트
- `np.arctan2` 함수를 기반으로 하여 이미 학습된 이미지에서 찍은 keypoint와 웹캠을 통한 자세의 관절 각도를 비교
    - `np.arctan2`는 유용한 포즈 유사도 추정 방법이 될 것이라고 생각함
    - 좌표의 정규화가 되지 않는다면 오류 가능성 있음
    - `np.arctan2`를 이미 들어온 영상에 대해 찍어둔다면 강사 영상의 fps와 input fps가 조금이라도 다르다면 도미노처럼 오류 가능성 있음

---
## 미디어파이프 BlazePose를 사용한 실시간 신체 추적 🏫 [link](https://brunch.co.kr/@synabreu/95)
**BlazePose [CVPR 2020]**
- 현재 Pose Estimation의 국룰은 17개 keypoint를 가진 [COCO Topology](https://cocodataset.org/#keypoints-2020)
- BlazePose는 33개의 keypoint를 추출
- 포즈 추적은 2단계 [Detector-Tracker ML Pipeline](https://ai.googleblog.com/2019/08/on-device-real-time-hand-tracking-with.html) 사용
- Detector를 이용하여 ROI(포즈 관심 영역) 탐색 → 33개의 keypoint 예측
- Detector를 이용하여 첫 프레임만 실행 → 후속 프레임은 이전 프레임에서 ROI 도출
- Python 기반으로 한다면, Mediapipe 사용도 고려해볼만하다고 생각함