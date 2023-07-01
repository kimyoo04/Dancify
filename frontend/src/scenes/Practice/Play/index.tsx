import { IPractice } from "@type/practice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { practiceActions } from "@features/practice/practiceSlice";
import * as poseDetection from "@tensorflow-models/pose-detection";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import SectionPlay from "./SectionPlay";
import SectionResult from "./SectionResult";
import { Button } from "@components/ui/button";

export default function Play({
  data,
  detector,
}: {
  data: IPractice;
  detector: poseDetection.PoseDetector;
}) {
  const dispatch = useAppDispatch();
  const { isFinished, playIndex, selectedSections } = useAppSelector(
    (state) => state.practice
  );

  return (
    <div className="h-full w-screen">
      <MainWrapper>
        {isFinished ? (
          <SectionResult data={data} />
        ) : (
          <SectionPlay data={data} detector={detector} />
        )}
      </MainWrapper>

      <BottomWrapper>
        {selectedSections.length <= playIndex + 1 ? (
          <Button
            disabled={!isFinished}
            onClick={() => dispatch(practiceActions.moveNextStep())}
          >
            연습 완료
          </Button>
        ) : (
          <Button onClick={() => dispatch(practiceActions.moveNextSection())}>
            다음 구간 연습
          </Button>
        )}
      </BottomWrapper>
    </div>
  );
}
