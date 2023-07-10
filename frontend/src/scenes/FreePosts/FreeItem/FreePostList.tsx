import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IUseInfniteFreePosts } from "@type/useInfiniteQueries";

import FreePostItem from "./FreePostItem";
import PostMore from "@scenes/Posts/PostItem/PostMore";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";
import FreeListWrapper from "@scenes/Posts/PostItem/FreeListWrapper";
import FreePostLoader from "@scenes/Posts/PostItem/FreePostLoader";

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
      {status === "loading" ? (
        <FreePostLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data && data.pages[0].data.length !== 0 ? (
        <>
          <FreeListWrapper>
            {/* //! 자유 게시판 검색결과 무한 스크롤 영역 */}
            {data.pages.map((group, indx) => (
              <Fragment key={indx + "page"}>
                {group.data.map((data, indx) => (
                  <FreePostItem
                    key={indx + data.postId}
                    data={data}
                    href={`/free/${data.postId}`}
                  />
                ))}
              </Fragment>
            ))}
          </FreeListWrapper>

          {/* //! fetchNextPage 를 트리거 하기 위한 태그 */}
          <PostMore inViewRef={ref} hasNextPage={hasNextPage} />
        </>
      ) : (
        <PostNotFound />
      )}
    </section>
  );
}
