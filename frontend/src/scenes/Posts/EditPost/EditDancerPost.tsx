import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditDancerPost({ id }: { id: string }) {
  const router = useRouter();

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

  return <div className="mx-auto max-w-2xl space-y-4"></div>;
}
