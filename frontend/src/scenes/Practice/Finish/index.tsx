import Link from "next/link";

import { Button } from "@components/ui/button";
import OtherDancerPostItem from "./OtherDancerPostItem";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

import { useReadOtherDancerPosts } from "@api/posts/readOtherDancerPosts";

export default function Finish() {
  // API GET 요청
  const { data } = useReadOtherDancerPosts();

  console.log(data)
  return (
    <div className="-mb-[7%] w-full space-y-20 px-6 dark:text-black">
      <section className="space-y-4">

        <div className="w-full px-2 col-center">
          <ScrollArea>
        <p className="w-full col-start text-2xl font-medium mb-4">다른 영상을 연습해보시겠어요?</p>
            <ul className="mt-0 flex gap-8 space-x-4 pb-4 pl-0">
              {data && data.map((data) => (
                <OtherDancerPostItem key={data.postId} data={data} />
              ))}
            </ul>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      <section className="col-center gap-4">
        <p className="text-xl font-medium">
          연습한 영상은 피드백 동영상에서 확인하실 수 있습니다.
        </p>

        <div className="row-between gap-4">
          <Link href="/feedbacks" replace={true}>
            <Button>피드백 동영상으로</Button>
          </Link>

          <Link href="/" replace={true}>
            <Button>홈으로</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
