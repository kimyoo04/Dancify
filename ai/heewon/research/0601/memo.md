## **신체 분절** : TensorFlow.js의 확장 모듈로, 실시간으로 사람의 신체 파트를 식별함

### link
https://github.com/tensorflow/tfjs-models/tree/master/body-segmentation
https://youtu.be/vbekvEDQRns

### file
#### bodypix.html
- bodypix 모델 로드 & segmantaion 모델을 호출해서 정보 불러내고 출력
- 비동기 함수 (async, await)
    - 일반적인 JavaScript 함수는 순차적으로 실행되어 결과를 반환하고 다음 작업으로 넘어갑니다. 하지만 비동기 함수는 비동기적인 동작을 수행하며, **결과를 기다리지 않고** 다른 작업을 진행할 수 있습니다.비동기 함수는 주로 네트워크 요청, 파일 읽기/쓰기, 타이머 설정 등과 같이 시간이 오래 걸리거나 외부 리소스에 의존하는 작업을 처리할 때 사용됩니다. 이러한 작업은 일반적으로 비동기적으로 처리되어야 하며, 비동기 함수를 통해 효율적으로 처리할 수 있습니다. 비동기 함수는 **async 키워드**를 사용하여 정의되며, 내부에서 **await 키워드**를 사용하여 비동기 작업의 완료를 기다릴 수 있습니다. await 키워드를 사용하면 비동기 작업의 결과를 반환하고, **해당 작업이 완료될 때까지 다음 코드 실행을 일시 중지**합니다. 이렇게 함으로써 비동기 함수 내에서 순차적인 동작을 유지하면서도 비동기 작업을 처리할 수 있습니다. 예를 들어, 비동기 함수를 사용하여 서버로부터 데이터를 가져오는 경우, 비동기 함수는 데이터를 요청하고 응답을 기다리는 동안 다른 작업을 수행할 수 있습니다. 그리고 응답이 도착하면 해당 데이터를 처리할 수 있습니다.
- bodyPix 이미지 분할 메소드 옵션
    - net.segmentPerson : 사람의 윤곽(실루엣)만 배경과 분류
    - net.segmentPersonParts : 사람의 실루엣 + 신체 분할
    - net.segmentMultiPerson : 여러 명의 윤곽(실루엣)만 배경과 분류
    - net.segmentMultiPersonParts : 여러 명의 실루엣 + 신체 분할
    - segment Person을 쓰면 사람 수를 잘못 인식할 수 있으니 segmentMultiPerson 쓰는 것이 좋음
    - 2인도 플레이할 수 있게 만드는 옵션을 넣는다면 솔로/듀오 플레이 모드로 나누는 것이 좋을 듯!?

### bodypix_toMask_drawMask.html
- 배경 / 신체 분리
- bodyPix.toMask, bodyPix.drawMask

### bodypix_toColoredPartMask.html
- 컬러로 마스킹 씌워서 신체 분할
- bodyPix.toColoredPartMask, bodyPix.drawMask

### bodypix_drawPixelatedMask.html
- 컬러를 격자로 표시
- bodyPix.toColoredPartMask, bodyPix.drawPixelatedMask

### bodypix_BokehEffect.html
- 사람을 제외한 배경을 흐릿하게 함
- bodyPix.drawPixelatedMask

### bodypix_blurBodyPart.html
- 파트 별로 블러효과
- bodyPix.blurBodyPart

### bodypix_skeleton.html
- drawSkeleton함수에서 posenet api의 사용하기 때문에 sciript에서 posenet도 load 해야 됨
- 변수 선언 : const -> 재할당 x, var -> 재할당 o
- onload 이벤트 핸들러를 사용하는 것은 이미지 리소스가 완전히 로드된 후에 loadAndPredict() 함수가 실행되도록 하기 위함

### iron_man_video.html
- 핵심 모듈 : https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@3.11.0/dist/tf-core.min.js
- 변환 모듈 : https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter@3.11.0/dist/tf-converter.min.js
- WebGL 백엔드 모듈 : https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@3.11.0/dist/tf-backend-webgl.min.js
- Pose Detection은 PoseNet을 포함하는 더 넓은 개념 : https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection@0.0.6/dist/pose-detection.min.js