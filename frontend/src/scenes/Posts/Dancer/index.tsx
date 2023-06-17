import DancerPostList from "@scenes/Posts/Dancer/DancerItem/DancerPostList";

import { useReadDancerPostsPerPage } from "@api/posts/readDancerPostsPerPage";

export default function DancerPosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadDancerPostsPerPage();

  return (
    <>
      <div className="bg-background">
        <div className="h-full">
          <div className="h-full space-y-6">
            <div className="h-full flex-col">
              {/* 자유게시판 fetch 결과 출력 */}
              <DancerPostList
                post={{
                  data,
                  error,
                  fetchNextPage,
                  hasNextPage,
                  isFetchingNextPage,
                  status,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
