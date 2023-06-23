import { useState } from "react";

import Config from "./Config";
import Prepare from "./Prepare";
import Play from "./Play";
import Finish from "./Finish";
import Step from "@components/Step";
import { TPostId } from "@type/posts";

export default function Practice({ postId }: { postId: TPostId }) {
  // 페이지 관리 state
  const [state, setState] = useState("연습설정");

  // API GET 요청

  return (
    <main>
      <Step isActive={state === "연습설정"}>
        <Config onNext={() => setState("연습준비")} />
      </Step>

      <Step isActive={state === "연습준비"}>
        <Prepare onNext={() => setState("연습시작")} />
      </Step>

      <Step isActive={state === "연습시작"}>
        <Play onNext={() => setState("연습완료")} />
      </Step>

      <Step isActive={state === "연습완료"}>
        <Finish />
      </Step>
    </main>
  );
}
