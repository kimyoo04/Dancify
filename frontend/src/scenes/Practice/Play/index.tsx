import { useRef } from "react";
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

export default function Play({
  data,
  detector,
}: {
  data: IPractice;
  detector: poseDetection.PoseDetector;
}) {
  const dispatch = useAppDispatch();
  const {
    isPlaying,
    isFinished,
    playIndex,
    feedbackId,
    selectedSections,
    sectionPracticeArr,
  } = useAppSelector((state) => state.practice);
  const isForceEnd = useRef(false);
  const webcamBestRecord = useRef<Blob>();
  const webcamCurrentRecord = useRef<Blob>();

  // 전체 연습 완료 버튼
  const practiceEnd = async () => {
    const danceableVod = webcamBestRecord.current;
    danceableVod &&
      (await postsPracticeData(
        feedbackId,
        sectionPracticeArr[playIndex],
        danceableVod
      ));
    dispatch(practiceActions.moveNextStep());
  };

  // 구간 연습 완료
  const sectionEnd = async () => {
    const danceableVod = webcamBestRecord.current;
    danceableVod &&
      (await postsPracticeData(
        feedbackId,
        sectionPracticeArr[playIndex],
        danceableVod
      ));
    dispatch(practiceActions.moveNextSection());
  };

  const sectionForceEnd = async () => {
    isForceEnd.current = true;
  };

  return (
    <div className="h-full w-screen">
      <MainWrapper>
        {!isPlaying && isFinished ? (
          <SectionResult />
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

      <BottomWrapper>
        {selectedSections.length <= playIndex + 1 ? (
          <Button disabled={!isFinished} onClick={practiceEnd}>
            연습 완료
          </Button>
        ) : isFinished ? (
          //구간 완료
          <Button onClick={sectionEnd}>다음 구간</Button>
        ) : (
          //강제 이동
          <Button onClick={sectionForceEnd}>다음 구간</Button>
        )}
      </BottomWrapper>
    </div>
  );
}
