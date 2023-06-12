import SideBar from "../SideBar";
import { playlists } from "../data/playlists";

import PostHeader from "../PostItem/PostHeader";
import ScrollButton from "@components/ScrollButton";
import CreateButton from "@scenes/Posts/Free/FreeItem/CreateButton";
import FreePostList from "./FreeItem/FreePostList";

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
        <div className="grid grid-cols-3 lg:grid-cols-5">
          {/* 사이드바 영역 */}
          <SideBar playlists={playlists} className="hidden lg:block" />

          {/* 콘텐츠 영역 */}
          <div className="col-span-3 lg:col-span-4 lg:border-l">
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

                  {/* 최상단 이동 버튼 */}
                  <ScrollButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
