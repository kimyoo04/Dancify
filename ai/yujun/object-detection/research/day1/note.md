# 필기 노트 1

## Youtube 강의
- edureka!의 OpenCV와 Python을 이용한 YOLO 🏫 [link](https://www.youtube.com/watch?v=b59xfUZZqJE&t=1s)
    - weights 파일 다운 링크: [link](https://pjreddie.com/darknet/yolo/)
    - OpenCV와 yolov3를 이용하여 코드 구현
    - 이점
        - 사람을 인식하는 성능 자체는 우수함
        - yolov3 모델을 제외하고는 코드 자체가 굉장히 간단함
    - 개선사항
        - 색상 코드 설정해줄 필요 있음
        - 바운딩 박스를 수동으로 그리기 때문에 직접 적용하기 위해서는 박스 관련해서 코드를 고쳐야 할 것 같음
- 빵형의 개발도상국 🏫 [link](https://www.youtube.com/watch?v=T0DO1C8uYP8&t=612s)
    - Roboflow를 통해 새롭게 데이터셋을 만든 것을 적용하는 방법

---
## TF Hub 🏫 [link](https://www.tensorflow.org/hub/tutorials/object_detection?hl=ko)
- TF Hub의 pre-trained model인 SSD MobileNetv2를 사용
- Faster R-CNN의 pre-trained model도 사용해볼 수 있었으나, 속도가 약 5.5배 느림

---
## YOLOv3 Darknet
- Darknet의 YOLOv3: C++ 기반의 빠른 속도와 적은 자원 사용 장점
- GPU 연동이 없으면 3분 10초의 영상의 Object Detection에 15분이 소요됨

---
## 이후 계획
- Ultralytics의 YOLOv5를 이용하는 것이 가장 나아보여서 관련해서 내일까지 리서치를 할 생각