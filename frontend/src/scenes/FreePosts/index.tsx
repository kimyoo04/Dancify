import FreePostHeader from "./FreeItem/FreePostHeader";
import FreePostList from "@scenes/FreePosts/FreeItem/FreePostList";
import CreateButton from "@scenes/Posts/PostItem/CreateButton";

import { useReadFreePostsPerPage } from "@api/posts/readFreePostsPerPage";
import SearchHeader from "@components/Search/SearchHeader";

export default function FreePosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadFreePostsPerPage();

  return (
    <>
      <div className="bg-background">
        <SearchHeader />

        <FreePostHeader />

        {/* 자유게시판 fetch 결과 출력 */}
        <FreePostList
          post={{
            data,
            error,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            status,
          }}
        />

        {/* 게시글 추가 버튼 */}
        <CreateButton category="free" />
      </div>
    </>
  );
}
