import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import Information from "./Infomation";
import ScoreBoard from "./ScoreBoard";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function Result({ data }: { data: IPractice }) {
  const dispatch = useAppDispatch();

  return (
    <div className="h-full w-screen">
      <MainWrapper>
        <h1 className="text-black text-2xl font-medium w-full mb-4 col-start">총 연습 결과</h1>

        <div className="col-center w-full gap-6 sm:gap-10 lg:flex-row dark:text-black">
          <ScoreBoard data={data} />
          <Information data={data} />
        </div>
      </MainWrapper>

      <BottomWrapper>
        <Button onClick={() => dispatch(practiceActions.moveNextStep())}>
          확인
        </Button>
      </BottomWrapper>
    </div>
  );
}
