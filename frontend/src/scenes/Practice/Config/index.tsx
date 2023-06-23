import { Button } from "@components/ui/button";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Config({ onNext }: { onNext: () => void }) {
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
      <h1>Config</h1>


      <Button onClick={onNext}>다음</Button>
    </div>
  );
}
