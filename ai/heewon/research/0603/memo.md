# 🧡 Tfjs typescript환경에서 사용

## 방법1 : 스크립트 태그 이용
-  ```<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.11.0/dist/tf.min.js"></script>```
## 방법2 : npm 이용해서 설치하기
- npm install @tensorflow/tfjs
- npm install -g typescript
- npm install posenet-similarity
- TypeScript : npx tsc --init
    - 타입스크립트 환경에서 사용한다면, 그리고 프로젝트에서 strict null 체킹을 한다면skipLibCheck: true 을 tsconfig.json에 포함시켜서 컴파일 도중에 에러가 나지 않도록 처리해야 합니다.


# 🧡 react app
- https://somjang.tistory.com/entry/React-%EC%8B%A4%EC%8A%B5%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0-1-yarn-%EC%84%A4%EC%B9%98%EC%99%80-create-react-app-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0
- npm install @tensorflow/tfjs @tensorflow-models/posenet react-webcam
-