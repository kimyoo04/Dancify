import { useEffect } from "react";
import { useRouter } from "next/router";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";
import Information from "./Infomation";
import ScoreBoard from "./ScoreBoard";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function Result({
  data,
}: {
  data: IPractice;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

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
        <h1>총 연습 결과</h1>

        <div className="col-center w-full gap-6 sm:gap-10 lg:flex-row">
          <ScoreBoard data={data} />
          <Information data={data} />
        </div>
      </MainWrapper>

      <BottomWrapper>
        <Button onClick={() => dispatch(practiceActions.increaseStep())}>
          확인
        </Button>
      </BottomWrapper>
    </div>
  );
}
