import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";
import { danceableBodyCheck } from "@ai/movenet";
import { Button } from "@components/ui/button";

export default function SectionPlay() {
  const dispatch = useAppDispatch();
  const webcamRef = useRef<Webcam>(null); // 댄서블 영상을 위한 웹캠
  const canvasRef = useRef<HTMLCanvasElement>(null); // 스캘레톤 매핑을 위한 캔버스

  const [webcamDims, setWebcamDims] = useState({
    width: 0,
    height: 0,
  });
  const [videoDims, setVideoDims] = useState({
    width: 0,
    height: 0,
  });


  // 동영상 및 진행 바 관련
  const playerRef = useRef<ReactPlayer>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState(0);

  const getVideoDuration = useCallback(() => {
    const progressBar = progressBarRef.current;
    const player = playerRef.current;
    if (progressBar && player) setDuration(player.getDuration());
  }, []);

  // 댄서와 웹캠 화면 사이즈 조정
  const handleScreenResize = () => {
    const webcam = webcamRef.current?.video;
    // webcamRef의 크기를 state에 저장하는 함수
    if (webcam) {
      const { clientWidth, clientHeight } = webcam;
      setWebcamDims({ width: clientWidth, height: clientHeight });
    }

    // 창 크기가 변경될 때마다 웹캠의 크기를 변경하는 함수
    const video = webcamRef.current?.video;
    if (video) {
      const { clientWidth, clientHeight } = video;
      setVideoDims({ width: clientWidth, height: clientHeight });
    }
  };

  // 호출 시 전신 체크 완료
  const bodyCheckCallback = () => dispatch(practiceActions.checkFullBody());

  // 1.5초 뒤와 resize 시 캔버스 크기 변경
  useEffect(() => {
    handleScreenResize();
    getVideoDuration();
    danceableBodyCheck(webcamRef, bodyCheckCallback); // 전신 체크 함수 실행
    window.addEventListener("resize", handleScreenResize);
    const tick = setTimeout(() => handleScreenResize(), 3000);
    return () => clearTimeout(tick);
  }, []);

  return (
    <div className="row-center w-full gap-10">
      <div className="row-center h-[700px] w-full">
        {/* //! 숏폼 UI 구현 필요 */}
        {/* 스트리밍 영역 */}
        <section
          className={`relative h-0 overflow-hidden rounded-md`}
          style={{
            width: `${videoDims.width / 2}px`,
            aspectRatio: `${videoDims.width / videoDims.height}`,
            paddingBottom: `${webcamDims.height}px`,
          }}
        >
          <ReactPlayer
            ref={playerRef}
            url={
               "https://d2w69iexuycwsi.cloudfront.net/vod/dancer/dancer7/65254fa3c7c845e2b51c8f0d1af99c34.m3u8"
            }
            width={"100%"}
            height={"100%"}
            className="absolute left-0 top-0 h-full w-full"
            muted
          />
          <div ref={progressBarRef} className="relative h-4 w-full">
            <div className="absolute bottom-0 h-full w-full bg-gray-300"></div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-md">
          {/* 웹캠 영상 */}
          <Webcam
            ref={webcamRef}
            mirrored={true}
            width={"100%"}
            height={"100%"}
          />

          {/* 스캘레톤 매핑 */}
          <canvas
            ref={canvasRef}
            style={{
              transform: `scaleX(-1)`, // 거울모드
            }}
            className={`absolute top-0 z-10 h-full w-full`}
          />
        </section>
      </div>
    </div>
  );
}
