import { useState } from "react";
import { TPostId } from "@type/posts";

import Loading from "@components/Loading";

import Step from "@components/Step";
import Config from "./Config";
import Prepare from "./Prepare";
import Play from "./Play";
import Finish from "./Finish";

import { useReadVideoSection } from "@api/videoSection/readVideoSection";
import Link from "next/link";
import { Button } from "@components/ui/button";

export default function Practice({ postId }: { postId: TPostId }) {
  // 페이지 관리 state
  const [state, setState] = useState("연습설정");

  // API GET 요청
  const { data, isLoading, error } = useReadVideoSection(postId);

  return (
    <main>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>에러</div>
      ) : //! 임시 조건 허용 data.dancerPost.hasOwnProperty("postId") && data.sections.length > 0
      data ? (
        <>
          <Step isActive={state === "연습설정"}>
            <Config onNext={() => setState("연습준비")} data={data} />
          </Step>

          <Step isActive={state === "연습준비"}>
            <Prepare onNext={() => setState("연습시작")} data={data} />
          </Step>

          <Step isActive={state === "연습시작"}>
            <Play onNext={() => setState("연습완료")} data={data} />
          </Step>

          <Step isActive={state === "연습완료"}>
            <Finish data={data} />
          </Step>
        </>
      ) : (
        <div className="col-center gap-4">
          <h2 className="text-2xl font-bold">데이터가 없습니다.</h2>

          <Link href="/">
            <Button>홈으로 이동</Button>
          </Link>
        </div>
      )}
    </main>
  );
}
