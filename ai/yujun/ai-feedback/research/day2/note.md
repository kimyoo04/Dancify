# 필기 노트 2

## Pose Detector by using TensorFlow.js 🏫 [link](https://www.youtube.com/watch?v=fiDaAc7z_kQ)
- 유튜브에 이미지에 대한 pose estimation에 대한 영상이 있어 시청 후 소스코드 확인
    - 소스코드 확인 결과, 사이트에 뜨는 이미지는 포즈를 보여주기 위한 그래픽으로 확인
    - train-test 과정에서는 human yoga pose의 이미지로 학습한 것을 확인
    - `movenet.py`: pose estimation 코드로 추측되나 아직 확인 중
    - `model.json`: 모델 구조
- [Yoga AI Trainer](https://eager-bardeen-e9f94f.netlify.app/)
- [github](https://github.com/harshbhatt7585/YogaIntelliJ)

---
## 생활코딩 Tensorflow.js 전체 수강 🏫 [link](https://www.youtube.com/playlist?list=PLuHgQVnccGMBEbPiaGs2kfQFpMmQchM-1)
- tf.js 설치 커맨드: `npm install @tensorflow/tfjs`
- index.js에서 실행
    ```javascript
    var tf = require('@tensorflow/tfjs');
    console.log(tf);
    ```
- index.html에서 실행
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest"> </script>
    </head>
    <body>
        <script>
            console.log(tf);
        </script>
    </body>
    </html>
    ```
- 생활코딩 제공 예제 파일(간단한 신경망 짜는 방법) → tfjs-shcd의 ex.html에서 확인 가능
- 모델 저장과 불러오기
    - html에서 학습하고 `model.save('downloads://lemon');` 입력하면 `.json`과 `.bin` 다운로드 가능
    - `ex.save.html`: 저장
    - `ex.load.html`: 로드

---
## Nicholas Renotte 🏫 [link](https://www.youtube.com/c/nicholasrenotte)
- MediaPipePoseEstimation: mediapipe를 이용한 Pose estimation
- MoveNetLightning: 동작 확인중... ⏳
- MultiPoseMovenetLightning: 함께 있는 조코비치 영상에 MoveNet 모델 적용
- PosenetRealtime: 동작 확인중... ⏳


---
## 읽어볼 것
- [미디어파이프 BlazePose를 사용한 실시간신체추적](https://brunch.co.kr/@synabreu/95)