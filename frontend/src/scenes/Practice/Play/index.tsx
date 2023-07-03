import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { IPractice } from "@type/practice";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import SectionPlay from "./SectionPlay";
import SectionResult from "./SectionResult";
import { Button } from "@components/ui/button";
import { postsPracticeData } from "@api/dance/postPracticeData";
import { ReloadIcon } from "@radix-ui/react-icons";
import ForceEndButton from "./SectionForceButton";

export default function Play({
  data,
  detector,
}: {
  data: IPractice;
  detector: poseDetection.PoseDetector;
}) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    isPlaying,
    isFinished,
    isMosaic,
    playIndex,
    feedbackId,
    selectedSections,
    sectionPracticeArr,
  } = useAppSelector((state) => state.practice);

  const isForceEnd = useRef(false); // 강제 종료 여부
  const webcamBestRecord = useRef<Blob>(); // 웹캠 최고 기록
  const webcamCurrentRecord = useRef<Blob>(); // 웹캠 현재 기록

  // 전체 연습 완료 버튼
  const handleMoveNextStep = async () => {
    const danceableVod = webcamBestRecord.current;
    danceableVod &&
      (await postsPracticeData(
        feedbackId,
        sectionPracticeArr[playIndex],
        danceableVod,
        isMosaic
      ));
    dispatch(practiceActions.moveNextStep());
  };

  // 구간 연습 완료 버튼
  const handleMoveNextSection = async () => {
    const danceableVod = webcamBestRecord.current;
    danceableVod &&
      (await postsPracticeData(
        feedbackId,
        sectionPracticeArr[playIndex],
        danceableVod,
        isMosaic
      ));
    dispatch(practiceActions.moveNextSection());
  };

  // 구간 연습 강제 종료 버튼
  const handleForceEndSection = async () => {
    isForceEnd.current = true;
  };

  return (
    <div className="h-full w-screen">
      {/* SectionResult 와 SectionPlayer 컴포넌트 토글 */}
      <MainWrapper>
        {!isPlaying && isFinished ? (
          <SectionResult
            handleMoveNextStep={handleMoveNextStep}
            handleMoveNextSection={handleMoveNextSection}
          />
        ) : (
          <SectionPlay
            data={data}
            detector={detector}
            isForceEnd={isForceEnd}
            webcamBestRecord={webcamBestRecord}
            webcamCurrentRecord={webcamCurrentRecord}
          />
        )}
      </MainWrapper>

      {/* 화면에 나오는 버튼 종류 */}
      <BottomWrapper>
        {isLoading ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            로딩 중..
          </Button>
        ) : selectedSections.length <= playIndex + 1 ? (
          // 전체 완료
          <Button
            disabled={!isFinished}
            onClick={async () => {
              setIsLoading(true);
              await handleMoveNextStep();
              setIsLoading(false);
            }}
          >
            연습 완료
          </Button>
        ) : isFinished ? (
          // 구간 완료
          <Button
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await handleMoveNextSection();
              setIsLoading(false);
            }}
          >
            다음 구간
          </Button>
        ) : (
          // 넘어가기
          <ForceEndButton
            setIsLoading={setIsLoading}
            handleForceEndSection={handleForceEndSection}
          />
        )}
      </BottomWrapper>
    </div>
  );
}
