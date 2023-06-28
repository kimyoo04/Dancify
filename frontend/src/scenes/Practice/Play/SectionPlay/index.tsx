import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { IPoseMessages, IPractice } from "@type/practice";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { danceableBodyCheck } from "@ai/movenet";
import { Button } from "@components/ui/button";

export default function SectionPlay({
  data,
  detactor,
}: {
  data: IPractice;
  detactor: poseDetection.PoseDetector;
}) {
  const dispatch = useAppDispatch();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webcamDimensions, setWebcamDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [count, setCount] = useState(5);
  const [poseMessage, setPoseMessage] = useState(""); //? 1초 마다 동작 평가를 저장
  // const [countDown, setCountDown] = useState(5);
  const {
    playIndex,
    isRealMode,
    isSkeleton,
    isFullBody,
    isPlaying,
    selectedSections,
  } = useAppSelector((state) => state.practice); // 선택된 섹션 인덱스 배열 가져오기

  // 선택된 섹션만 추출
  const selectedSectionUrls = isRealMode
    ? [{ video: data.dancerPost.video }]
    : data.sections.filter((section, index) =>
        selectedSections.includes(index)
      );

  function bodyCheckCallback() {
    console.log("bodyCheckCallback");
    dispatch(practiceActions.checkFullBody());
  }

  function resultCallback(avgScore: number, poseMessages: IPoseMessages) {
    dispatch(
      practiceActions.updateSectionPractice({
        sectionId: data.sections[playIndex].sectionId,
        score: avgScore,
        poseMessages,
      })
    );
    dispatch(practiceActions.finishSectionPlay());
  }

  // 창 크기가 변경될 때마다 웹캠의 크기를 변경하는 함수
  const handleWebcamResize = () => {
    const webcam = webcamRef.current?.video;
    if (webcam) {
      const { clientWidth, clientHeight } = webcam;
      setWebcamDimensions({ width: clientWidth, height: clientHeight });
    }
  };

  // videoRef의 크기를 state에 저장하는 함수
  const handleVideoResize = () => {
    const video = webcamRef.current?.video;
    if (video) {
      const { clientWidth, clientHeight } = video;
      setVideoDimensions({ width: clientWidth, height: clientHeight });
    }
  };

  // 1.5초 뒤와 resize 시 캔버스 크기 변경 및 전신 체크 함수 실행
  useEffect(() => {
    handleVideoResize();
    handleWebcamResize();
    danceableBodyCheck(webcamRef, bodyCheckCallback);
    window.addEventListener("resize", handleWebcamResize);
    const tick = setTimeout(() => {
      handleVideoResize();
      handleWebcamResize();
    }, 3000);
    return () => {
      window.removeEventListener("resize", handleWebcamResize);
      clearTimeout(tick);
    };
  }, []);

  // 캔버스 영역에 그려주는 함수
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { width, height } = webcamDimensions;
    canvas.width = width;
    canvas.height = height;

    // 캔버스 크기를 비디오 크기와 동일하게 설정
    const captureFrame = () => {
      const video = webcamRef.current?.video;
      if (video) {
        if (isSkeleton) {
          //* 스캘레톤 매핑을 수행하는 로직
        }
      }
      requestAnimationFrame(captureFrame);
    };

    captureFrame();
  }, [webcamDimensions, isSkeleton]);

  //! 카운트 다운 (수정 필요)
  useEffect(() => {
    if (isFullBody) {
      const countDown = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearInterval(countDown);
    }
  }, [isFullBody]);

  // 카운트 다운이 끝나면 영상 재생
  useEffect(() => {
    if (isFullBody) {
      const timer = setTimeout(() => {
        dispatch(practiceActions.playVideo());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isFullBody, dispatch]);

  return (
    <div className="row-center w-full gap-10">
      <div className="row-center h-80 w-full">
        {/* //! 숏폼 UI 구현 필요 */}
        {/* 스트리밍 영역 */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative h-0 overflow-hidden rounded-md`}
          style={{
            width: `${videoDimensions.width / 2}px`,
            aspectRatio: `${videoDimensions.width / videoDimensions.height}`,
            paddingBottom: `${webcamDimensions.height}px`,
          }}
        >
          <ReactPlayer
            url={selectedSectionUrls.map((section) => section.video)[playIndex]}
            playing={isPlaying}
            width={"100%"}
            height={"100%"}
            className="absolute left-0 top-0 h-full w-full"
            onEnded={() => dispatch(practiceActions.finishSectionPlay())}
          />
        </motion.section>

        <section className="relative overflow-hidden rounded-md">
          {/* 웹캠 영상 */}
          <Webcam ref={webcamRef} mirrored={true} />

          {/* 스캘레톤 매핑 */}
          <canvas
            ref={canvasRef}
            style={{
              transform: `scaleX(-1)`, // 거울모드
            }}
            className={`absolute top-0 z-10 h-full w-full`}
          />

          {!isFullBody ? (
            <div className="absolute top-0 z-10 flex h-full w-full items-end justify-end gap-2 pb-3 pr-3">
              {/* 전신 메시지 */}
              <p className="rounded-md bg-background px-2 text-xl">
                전신이 보이도록 뒤로 이동해주세요.
              </p>
              <Button onClick={() => dispatch(practiceActions.checkFullBody())}>
                강제 시작
              </Button>
            </div>
          ) : count > -1 ? (
            <div className="col-center absolute top-0 z-10 h-full w-full">
              {/* 카운트 다운 */}
              <div className="col-center h-32 w-32 rounded-full bg-background">
                <span className="text-5xl font-medium">{count}</span>
              </div>
            </div>
          ) : null}

          {/* 평가 UI 영역 */}
          <div className="col-center absolute bottom-4 left-4 z-10">
            {poseMessage !== "" && (
              <span className="text-lg font-medium">{poseMessage}</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
