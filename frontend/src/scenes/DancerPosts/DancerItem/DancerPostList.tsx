import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IUseInfniteDancerPosts } from "@type/useInfiniteQueries";

import DancerPostItem from "./DancerPostItem";
import PostMore from "@scenes/Posts/PostItem/PostMore";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";
import DancerListWrapper from "@scenes/Posts/PostItem/DancerListWrapper";
import DancerPostLoader from "@scenes/Posts/PostItem/DancerPostLoader";

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
      ) : data && data.pages[0].data.length !== 0 ? (
        <>
          <DancerListWrapper>
            {/* //! 댄서게시판 검색결과 무한 스크롤 영역 */}
            {data.pages.map((group, indx) => (
              <Fragment key={indx + "page"}>
                {group.data.map((data, indx) => (
                  <DancerPostItem
                    key={indx + data.postId}
                    data={data}
                    href={`/dancer/${data.postId}`}
                  />
                ))}
              </Fragment>
            ))}
          </DancerListWrapper>

          {/* //! fetchNextPage 를 트리거 하기 위한 태그 */}
          <PostMore inViewRef={ref} hasNextPage={hasNextPage} />
        </>
      ) : (
        <PostNotFound />
      )}
    </section>
  );
}
