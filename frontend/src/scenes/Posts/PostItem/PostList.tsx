import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import PostListLoader from "./PostListLoader";
import { IUseInfnitePosts } from "@type/useInfiniteQueries";
import PostNotFound from "./PostNotFound";
import PostThumbnail from "./PostThumbnail";

export default function PostList({ post }: { post: IUseInfnitePosts }) {
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
    <section className="col-center w-full gap-4">
      {status === "loading" ? (
        <PostListLoader />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data ? (
        <ul className="grid w-full grid-cols-1 gap-4">
          {/* //! 자유게시판 검색결과 무한 스크롤 영역 */}
          {data.pages.map((group, indx) => (
            <Fragment key={indx + "page"}>
              {group.data.map((data, indx) => (
                <PostThumbnail key={indx + data.postId} data={data} />
              ))}
            </Fragment>
          ))}
        </ul>
      ) : (
        <PostNotFound />
      )}
    </section>
  );
}
