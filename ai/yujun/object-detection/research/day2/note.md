# 필기 노트 2

## audio-edit
- `moviepy`를 이용하여 영상에서 음성분리, 음성합성 방법 확인
    - `ditto.mp4`(3분 10초): 분리에 1.5s, 합성에 34s
    - `hypeboy.mp4`(1분 27초): 분리에 1.1s, 합성에 15s
- 음성분리: 영상에서 음성을 분리하여 .mp3 확장자로 저장
- 음성합성: 합성할 영상과 합성할 음성을 입력하면 .mp4 확장자로 저장
- **음성분리** → object detection → object crop → **음성합성**

## YOLOv5에서 사람만 인식하는 방법 (폐기)
- `python3 detect.py --weights yolov5s.pt --source (영상경로) --classes 0`

## mediapipe를 이용한 사람 인식
- `mediapipe`의 Pose Estimation을 이용하여 신체 추정
- YOLOv5 대비 작업속도 대폭 개선 (antifragile 기준)
    - YOLOv5
        - 소요시간: 3min
        - 새로운 영상 생성, 프레임 단위로 detect 값 txt 파일 생성
    - mediapipe
        - 소요시간: 17sec
        - detect 값을 리스트로 바로 받을 수 있음
- `left_shoulder(11)`과 `right_shoulder(12)`만 구해서 그 가운데를 `x_center`로 놓음
- `x_center`를 구해서 30 프레임의 이동평균을 구해 Smoothing하여 사용

## 최종 로직
1. `moviepy`를 이용하여 음성 분리
2. `mediapipe`를 이용하여 신체 인식
3. `opencv`를 이용하여 영상 크롭
4. `moviepy`를 이용하여 음성 합성