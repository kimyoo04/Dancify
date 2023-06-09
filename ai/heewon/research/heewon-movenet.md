# 🎀 heewon-movenet
## 🎈 실행 방법
- heewon-movement clone > package-lock.json 삭제 > npm i --force > npm run start
- 처음 실행되는데 10~15초 정도 걸립니다
- keypoints 빨간 창 에러 뜨는 건 사람 인식 못 해서 뜨는 것. 창 x 누르고 사람 나오게 하면 다시 정상적으로 작동됨

## 🎈 수정사항
### draw canvas
- utilities.js를 drawSkeleton, drawKeypoints를 movenet 출력값에 맞게 수정
- drawSkeleton은 0609/re1-movement파일 참고하였음

### App.js
- https://www.npmjs.com/package/@tensorflow-models/pose-detection?activeTab=readme 참고하여 PosenetRealtime의 App.js을 수정하였음