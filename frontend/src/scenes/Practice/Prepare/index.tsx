import { useEffect } from "react";
import { useRouter } from "next/router";

import MainWrapper from "../Wrapper/MainWarpper";
import BottomWrapper from "../Wrapper/BottomWrapper";

import { Button } from "@components/ui/button";
import { IPractice } from "@type/practice";

export default function Prepare({
  onNext,
  data,
}: {
  onNext: () => void;
  data: IPractice;
}) {
  const router = useRouter();

  useEffect(() => {
    if (window) {
      // 뒤로가기 방지
      if (router.asPath !== window.location.pathname) {
        window.history.pushState("", "", router.asPath);
      }
      // 새로고침 방지
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
        <h1>Prepare</h1>
      </MainWrapper>

      <BottomWrapper>
        <Button onClick={onNext}>다음</Button>
      </BottomWrapper>
    </div>
  );
}
