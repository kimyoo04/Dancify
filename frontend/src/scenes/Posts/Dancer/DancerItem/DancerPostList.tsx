import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IUseInfniteDancerPosts } from "@type/useInfiniteQueries";

import DancerPostItem from "./DancerPostItem";
import DancerPostLoader from "./DancerPostLoader";
import PostMore from "@scenes/Posts/PostItem/PostMore";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";

export default function DancerPostList({
  post,
}: {
  post: IUseInfniteDancerPosts;
}) {
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
      {status === "loading" ? (
        <DancerPostLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data ? (
        <>
          <ul className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* //! 자유게시판 검색결과 무한 스크롤 영역 */}
            {data.pages.map((group, indx) => (
              <Fragment key={indx + "page"}>
                {group.data.map((data, indx) => (
                  <DancerPostItem
                    key={indx + data.postId}
                    data={data}
                    width={240}
                    height={330}
                  />
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
