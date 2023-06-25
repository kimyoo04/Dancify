import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { IPractice } from "@type/practice";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";

export default function SectionPlay({ data }: { data: IPractice }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [status, setStatus] = useState(""); //? 1초 마다 동작 평가를 저장
  const { playIndex, isSkeleton, selectedSections } = useAppSelector(
    (state) => state.practice
  ); // 선택된 섹션 인덱스 배열 가져오기

  // 선택된 섹션만 추출
  const selectedSectionUrls = data.sections.filter((section, index) =>
    selectedSections.includes(index)
  );

  // 창 크기가 변경될 때마다 캔버스 크기를 변경해주는 함수
  const handleResize = () => {
    const video = webcamRef.current?.video;
    if (video) {
      const { clientWidth, clientHeight } = video;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  };

  // 2초 뒤와 resize 시 캔버스 크기 변경 (canvas 화질 문제 해결)
  useEffect(() => {
    const tick = setTimeout(() => {
      handleResize();
    }, 2000);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(tick);
    };
  }, []);

  // 캔버스 영역에 그려주는 함수
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const { width, height } = dimensions;
    canvas.width = width;
    canvas.height = height;

    // 캔버스 크기를 비디오 크기와 동일하게 설정
    const captureFrame = () => {
      const video = webcamRef.current?.video;
      if (video) {
        // 비디오 영상을 똑같이 캔버스에 그림
        context.drawImage(video, 0, 0, width, height);

        //* 스캘레톤 매핑을 수행하는 로직
        if (isSkeleton) {
          // context.drawImage(skeleton, 0, 0, width, height);
        }
      }
      requestAnimationFrame(captureFrame);
    };

    captureFrame();
  }, [dimensions, isSkeleton]);

  // 새로고침 및 뒤로가기 방지
  useEffect(() => {
    if (window) {
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, []);

  return (
    <div className="row-center w-full gap-10">
      {/* 스트리밍 영역 */}
      {/* //! 숏폼 UI 구현 필요 */}
      {/* //! 무한스크롤과 비슷하게 구현이 될 것으로 보임 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full w-[500px] overflow-hidden rounded-md"
      >
        <div className="relative pt-[100%]">
          <ReactPlayer
            url={selectedSectionUrls.map((section) => section.video)[playIndex]}
            playing={false}
            width="100%"
            height="100%"
            className="absolute left-0 top-0"
          />
        </div>
      </motion.div>

      {/* 웹캠 영역 */}
      <div className="relative overflow-hidden rounded-md">
        {/* //* 웹캠 영상 */}
        <Webcam ref={webcamRef} mirrored={true} />

        {/* //* 스캘레톤 매핑 */}
        <canvas
          ref={canvasRef}
          style={{
            transform: `scaleX(-1)`, // translateY(-10%) 비교용
          }}
          className={`absolute top-0 z-10 h-full w-full`}
        />
      </div>

      {/* 평가 UI 영역 */}
      <div>{status && <span style={{ fontSize: "300%" }}>{status}</span>}</div>
    </div>
  );
}
