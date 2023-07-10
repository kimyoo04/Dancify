import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IUseInfniteVideoPosts } from "@type/useInfiniteQueries";

import VideoPostItem from "./VideoPostItem";
import PostMore from "@scenes/Posts/PostItem/PostMore";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";
import VideoListWrapper from "@scenes/Posts/PostItem/VideoListWrapper";
import VideoPostLoader from "@scenes/Posts/PostItem/VideoPostLoader";

export default function VideoPostList({
  post,
}: {
  post: IUseInfniteVideoPosts;
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
        <VideoPostLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data && data.pages[0].data.length !== 0 ? (
        <>
          <VideoListWrapper>
            {/* //! 자유 게시판 검색결과 무한 스크롤 영역 */}
            {data.pages.map((group, indx) => (
              <Fragment key={indx + "page"}>
                {group.data.map((data, indx) => (
                  <VideoPostItem
                    key={indx + data.postId}
                    data={data}
                    href={`/video/${data.postId}`}
                  />
                ))}
              </Fragment>
            ))}
          </VideoListWrapper>

          {/* //! fetchNextPage 를 트리거 하기 위한 태그 */}
          <PostMore inViewRef={ref} hasNextPage={hasNextPage} />
        </>
      ) : (
        <PostNotFound />
      )}
    </section>
  );
}
