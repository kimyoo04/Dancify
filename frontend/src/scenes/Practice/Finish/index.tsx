import Link from "next/link";

import { Button } from "@components/ui/button";
import { useEffect } from "react";
import { IPractice } from "@type/practice";

export default function Finish({ data }: { data: IPractice }) {
  useEffect(() => {
    if (window) {
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
      <h1>Finish</h1>

      <div className="row-between gap-4">
        <Link href="/feedbacks" replace={true}>
          <Button>피드백 페이지로 이동</Button>
        </Link>

        <Link href="/" replace={true}>
          <Button>아니요</Button>
        </Link>
      </div>
    </div>
  );
}
