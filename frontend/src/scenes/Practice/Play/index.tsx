import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { IPractice } from "@type/practice";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import ShortPlayer from "./shortPlayer";
import { Button } from "@components/ui/button";
import Webcam from "react-webcam";
import { motion } from "framer-motion";

export default function Play({
  onNext,
  data,
}: {
  onNext: () => void;
  data: IPractice;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true); //? true로 바꿔야함
  const [playIndex, setPlayIndex] = useState(0); //? 인덱스를 바꿔주는 작업으로 숏폼 진행
  const [status, setStatus] = useState(""); //? 1초 마다 동작 평가를 저장

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 선택된 섹션 인덱스 배열 가져오기
  const { isSkeleton, selectedSections } = useAppSelector(
    (state) => state.practice
  );

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
    <div className="h-screen w-screen">
      <MainWrapper>
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
            <ShortPlayer
              url={
                selectedSectionUrls.map((section) => section.video)[playIndex]
              }
            />
          </motion.div>

          {/* 웹캠 영역 */}
          {/* //! 초기에 화질이 안좋은 문제점 해결 필요 */}
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
          <div>
            {status && <span style={{ fontSize: "300%" }}>{status}</span>}
          </div>
        </div>
      </MainWrapper>

      <BottomWrapper>
        <p>신체 전부가 보이도록 뒤로 이동해주세요.</p>
        {/* //? 여기서는 다음 버튼이 없어야함 */}
        <Button onClick={onNext}>다음</Button>
      </BottomWrapper>
    </div>
  );
}
