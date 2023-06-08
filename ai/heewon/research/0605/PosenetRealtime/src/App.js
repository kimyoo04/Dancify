import React, { useRef, useEffect } from "react";
import "./App.css";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilities";
import ReactPlayer from "react-player";
import { poseSimilarity } from 'posenet-similarity';
import dancer_json from './dancer_json.json' //댄서의 스켈레톤 정보


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const reactPlayerRef = useRef(null);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // console.log(video)

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      // console.log(pose);

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
      return pose
    }
  };


  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    drawKeypoints(pose["keypoints"], 0.6, ctx);
    // drawSkeleton(pose["keypoints"], 0.7, ctx);
  };


  useEffect(() => {
    const runPosenet = async () => {
      const net = await posenet.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8,
      });

      let indx = 1;

      const intervalId = setInterval(async () => { //중괄호 바깥에서 선언하면 undefined
        const dancable = await detect(net);
        const dancer = await dancer_json[indx];
        console.log('dancable',dancable);
        console.log('dancer',dancer);
        console.log(indx)
        indx += 30
        const weightedDistance = poseSimilarity(dancable, dancer);
        console.log(weightedDistance)
      }, 1000); //1초마다 check

      // 컴포넌트가 언마운트될 때 interval 정리
      return () => {
        clearInterval(intervalId);

      };
    };

    runPosenet();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <ReactPlayer
          ref={reactPlayerRef}
          url="/videos/exo-lmr_shorts_720.mp4"
          controls
          width="30%"
          height="30%"
          style={{ marginRight: "auto" }}
        />
      </header>
    </div>
  );
}

export default App;