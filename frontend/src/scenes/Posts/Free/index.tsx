import GenreButtons from "@components/GenreButtons";
import FreePostHeader from "./FreeItem/FreePostHeader";
import FreePostList from "@scenes/Posts/Free/FreeItem/FreePostList";

import { useReadFreePostsPerPage } from "@api/posts/readFreePostsPerPage";
import CreateButton from "../PostItem/CreateButton";

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
        <GenreButtons />

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
