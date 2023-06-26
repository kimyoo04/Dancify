import { useRouter } from "next/router";
import { IPractice } from "@type/practice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";
import * as poseDetection from "@tensorflow-models/pose-detection";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import SectionPlay from "./SectionPlay";
import SectionResult from "./SectionResult";
import { Button } from "@components/ui/button";

export default function Play({
  onNext,
  data,
  detactor,
}: {
  onNext: () => void;
  data: IPractice;
  detactor: poseDetection.PoseDetector;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isFinished, playIndex, selectedSections } = useAppSelector(
    (state) => state.practice
  );

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
    <div className="min-h-[93%] w-screen">
      <MainWrapper>
        {isFinished ? (
          <SectionResult data={data} />
        ) : (
          <SectionPlay data={data} detactor={detactor} />
        )}
      </MainWrapper>

      <BottomWrapper>
        {selectedSections.length === playIndex + 1 ? (
          <Button onClick={onNext}>연습 완료</Button>
        ) : (
          <Button onClick={() => dispatch(practiceActions.moveNextSection())}>
            다음 구간 연습
          </Button>
        )}
      </BottomWrapper>
    </div>
  );
}
