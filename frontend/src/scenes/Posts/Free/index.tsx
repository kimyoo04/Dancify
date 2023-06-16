import PostHeader from "../PostItem/PostHeader";
import CreateButton from "@scenes/Posts/Free/FreeItem/CreateButton";
import FreePostList from "@scenes/Posts/Free/FreeItem/FreePostList";

import { useReadFreePostsPerPage } from "@api/posts/readFreePostsPerPage";

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
      <div className="container bg-background">
        {/* 콘텐츠 영역 */}
        <div className="h-full py-6 lg:px-8">
          <div className="h-full space-y-6">
            <PostHeader />

            <div className="h-full flex-col">
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
              <CreateButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
