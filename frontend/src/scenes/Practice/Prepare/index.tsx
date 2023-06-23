import { Button } from "@components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Prepare({ onNext }: { onNext: () => void }) {
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
    <div>
      <h1>Prepare</h1>
      <Button onClick={onNext}>안무 연습 시작</Button>
    </div>
  );
}
