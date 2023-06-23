# 필기 노트 2

## audio-edit
- `moviepy`를 이용하여 영상에서 음성분리, 음성합성 방법 확인
    - `ditto.mp4`(3분 10초): 분리에 1.5s, 합성에 34s
    - `hypeboy.mp4`(1분 27초): 분리에 1.1s, 합성에 15s
- 음성분리: 영상에서 음성을 분리하여 .mp3 확장자로 저장
- 음성합성: 합성할 영상과 합성할 음성을 입력하면 .mp4 확장자로 저장
- **음성분리** → object detection → object crop → **음성합성**

## YOLOv5에서 사람만 인식하는 방법
- `python3 detect.py --weights yolov5s.pt --source (영상경로) --classes 0`

## YOLOv5에서 인식한 객체를 크롭하는 방법 (후보군)
- `python3 detect.py --weights yolov5s.pt --source (영상경로) --save-txt --classes 0`
- YOLOv5의 결과물을 OpenCV를 통해 bounding box 안쪽만 잘라내는 방법
    - 커맨드에 `--save-txt`를 입력하여 프레임 단위로 텍스트 파일을 받을 수 있음
    - `class x_center y_center width height (0 0.517969 0.629861 0.0703125 0.434722)`
        - class: 감지된 객체의 유형

            (해석: 클래스 ID가 0인 객체가 있음)
        - x_center, y_center: bounding box의 중심점 좌표, 이미지의 너비와 높이에 대한 비율로 표현됨

            (해석: 그 중심점은 이미지의 너비와 높이에 대해 각각 51.8%, 63.0%에 있음)
        - width, height: bounding box의 너비와 높이, 이미지의 너비와 높이에 대한 비율로 표현됨


            (해석: bounding box의 너비와 높이는 이미지의 너비와 높이에 대해 각각 7.0%, 43.5%에 있음)
- 몰라잉...