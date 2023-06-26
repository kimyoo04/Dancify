import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@components/ui/button";
import OtherDancerPostItem from "./OtherDancerPostItem";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

import { useReadOtherDancerPosts } from "@api/posts/readOtherDancerPosts";

export default function Finish() {
  // 새로고침 방지
  useEffect(() => {
    if (window) {
      window.onbeforeunload = () => {
        return true;
      };
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, []);

  // API GET 요청
  // const { data, isLoading, error } = useReadOtherDancerPosts();

  const data = [
    {
      postId: "sdasdqdqsgq",
      title: "title",
      nickname: "nickname",
      content: "content",
      createDate: "createDate",
      thumbnail:
        "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg",
      video: "video",
      views: 1,
      commentsCount: 1,
      likesCount: 1,
      feedbackPrice: 1,
    },
    {
      postId: "sdadeqdqsgq",
      title: "title",
      nickname: "nickname",
      content: "content",
      createDate: "createDate",
      thumbnail:
        "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg",
      video: "video",
      views: 1,
      commentsCount: 1,
      likesCount: 1,
      feedbackPrice: 1,
    },
    {
      postId: "ybdasdtbysgq",
      title: "title",
      nickname: "nickname",
      content: "content",
      createDate: "createDate",
      thumbnail:
        "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg",
      video: "video",
      views: 1,
      commentsCount: 1,
      likesCount: 1,
      feedbackPrice: 1,
    },
    {
      postId: "wqwnudqdqsgq",
      title: "title",
      nickname: "nickname",
      content: "content",
      createDate: "createDate",
      thumbnail:
        "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg",
      video: "video",
      views: 1,
      commentsCount: 1,
      likesCount: 1,
      feedbackPrice: 1,
    },
    {
      postId: "tsdfsdqdqsgq",
      title: "title",
      nickname: "nickname",
      content: "content",
      createDate: "createDate",
      thumbnail:
        "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/thumbnail/dancer3/fd32fhj890fjwefiwefjwe-thumbnail.0000000.jpg",
      video: "video",
      views: 1,
      commentsCount: 1,
      likesCount: 1,
      feedbackPrice: 1,
    },
  ];

  return (
    <div className="-mb-[7%] w-full space-y-20 px-6">
      <section className="space-y-4">
        <p className="text-xl font-medium">다른 영상을 연습해보시겠어요?</p>

        <div className="w-full px-2">
          <ScrollArea>
            <ul className="mt-0 flex gap-8 space-x-4 pb-4 pl-0">
              {data.map((data) => (
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
            <Button>피드백 동영상으로 이동</Button>
          </Link>

          <Link href="/" replace={true}>
            <Button>아니요</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
