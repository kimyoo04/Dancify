# 필기 노트 1

## TensorFlow.js 시작하기 🏫 [link](https://www.tensorflow.org/js/tutorials?hl=ko)
- tfjs 공식문서 튜토리얼을 통해 Node.js와 yarn 환경설정
- 예제 설치 및 실행
    1. [tfjs-examples](https://github.com/tensorflow/tfjs-examples) git clone
    2. `cd tfjs-examples/getting-started`
    3. 종속성 설치: `yarn install`
    4. `index.html` 실행 → `index.js` 로드되어 $y=2x-1$의 $x$와 $y$로 `tf.sequential` training

---
## 생활코딩 Tensorflow.js 4강: 남의 모델을 이용하기 🏫 [link](https://www.youtube.com/watch?v=ZJX0J21AZOA&list=PLuHgQVnccGMBEbPiaGs2kfQFpMmQchM-1&index=5)
**학습내용: [TensorFlow.js 모델: 이미지 분류](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)**
- TensorFlow.js의 기초적 작동원리
- 사전 학습된 모델을 로딩하는 방법
- MobileNet 사용

Usage → via Script Tag → MobileNet.html에 복사
→ img 변경 → Go Live → console에서 확인

---
## tfjs-models/pose-detection
- TF에서 제공하는 공식 tfjs model
- Pose Detection의 MoveNet, BlazePose, PoseNet의 Demo 비교
- [link](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/demos#live-camera-demo)


---
## 이후에 챙겨볼 내용
- [웹 브라우저 또는 Node.js에서 구현하기 위해 tfjs를 설치하는 방법](https://www.tensorflow.org/js/tutorials/setup?hl=ko)
- [Python에서 학습한 Keras 모델을 TensorFlow.js로 변환하는 방법](https://www.tensorflow.org/js/tutorials/conversion/import_keras?hl=ko)