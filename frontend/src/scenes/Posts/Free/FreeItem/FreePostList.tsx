import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IUseInfniteFreePosts } from "@type/useInfiniteQueries";

import FreePostItem from "./FreePostItem";
import FreePostLoader from "./FreePostLoader";
import PostMore from "@scenes/Posts/PostItem/PostMore";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";
import { Separator } from "@components/ui/separator";

export default function FreePostList({ post }: { post: IUseInfniteFreePosts }) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = post;

  // ref가 연결된 태그의 확인 + 하단 페이지에 도달시 fetchNextPage 요청
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  return (
    <section className="col-start w-full gap-4">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              자유게시판
            </h2>
            <p className="text-sm text-muted-foreground">
              자유롭게 글을 올리고, 댓글을 달아주세요.
            </p>
          </div>
        </div>
        <Separator className="my-4" />
      </div>

      {status === "loading" ? (
        <FreePostLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data ? (
        <>
          <ul className="grid w-full grid-cols-1 gap-4">
            {/* //! 자유게시판 검색결과 무한 스크롤 영역 */}
            {data.pages.map((group, indx) => (
              <Fragment key={indx + "page"}>
                {group.data.map((data, indx) => (
                  <FreePostItem key={indx + data.postId} data={data} />
                ))}
              </Fragment>
            ))}
          </ul>

          {/* //! fetchNextPage 를 트리거 하기 위한 태그 */}
          <PostMore inViewRef={ref} hasNextPage={hasNextPage} />
        </>
      ) : (
        <PostNotFound />
      )}
    </section>
  );
}
