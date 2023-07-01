import { useEffect, useRef } from "react";
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
    isFinished,
    playIndex,
    feedbackId,
    selectedSections,
    sectionPracticeArr,
  } = useAppSelector((state) => state.practice);
  const isForceEnd = useRef(false);

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

  const practiceEnd = async () => {
    await postsPracticeData(feedbackId, playIndex, sectionPracticeArr);
    dispatch(practiceActions.moveNextStep());
  };

  const sectionEnd = async () => {
    await postsPracticeData(feedbackId, playIndex, sectionPracticeArr);
    dispatch(practiceActions.moveNextSection());
  };

  const sectionForceEnd = async () => {
    isForceEnd.current = true;
  };

  return (
    <div className="h-full w-screen">
      <MainWrapper>
        {isFinished ? (
          <SectionResult data={data} />
        ) : (
          <SectionPlay data={data} detector={detector} isForceEnd={isForceEnd}/>
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
