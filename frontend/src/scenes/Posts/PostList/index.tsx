import { IPostData } from "@type/posts";

import PostItem from "@scenes/Posts/PostItem";
import PostListLoader from "./PostListLoader";

import { useReadPosts } from "@api/posts/readPosts";

export default function PostList() {
  // page 단위로 educationdata GET 요청 및 캐싱
  const { data, isLoading, isError, error } = useReadPosts();

  return (
    <section className="col-center w-full gap-4">
      {isLoading ? (
        <PostListLoader />
      ) : isError ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data.data.length !== 0 ? (
        <>
          {/* //! 자유게시판 검색결과 무한 스크롤 영역 */}
          <ul className="grid w-full grid-cols-1 gap-4">
            {data.data.map((post, indx) => (
              <PostItem key={post.postId + indx} post={post as IPostData} />
            ))}
          </ul>
        </>
      ) : (
        <div>결과가 없습니다!</div>
      )}
    </section>
  );
}
