import { useRouter } from "next/router";
import { IPractice } from "@type/practice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import SectionResult from "./SectionResult";
import SectionPlay from "./SectionPlay";
import { practiceActions } from "@features/practice/practiceSlice";

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
  const [isBody, setIsBody] = useState(false); //? 바디가 인식되었는지 확인
  const [isFinished, setisFinished] = useState(true); //? 구간 연습이 끝났는지 확인
  const { playIndex, selectedSections } = useAppSelector(
    (state) => state.practice
  ); //? 인덱스를 바꿔주는 작업으로 숏폼 진행

  return (
    <div className="h-screen w-screen">
      <MainWrapper>
        {isFinished ? (
          <SectionResult data={data} />
        ) : (
          <SectionPlay data={data} />
        )}
      </MainWrapper>

      <BottomWrapper>
        {!isBody && <p>신체 전부가 보이도록 뒤로 이동해주세요.</p>}
        {/* //? 여기서는 다음 버튼이 없어야함 */}
        {selectedSections.length === playIndex + 1 ? (
          <Button onClick={onNext}>연습 완료</Button>
        ) : (
          <Button onClick={() => dispatch(practiceActions.moveNextSection())}>
            다음
          </Button>
        )}
      </BottomWrapper>
    </div>
  );
}
