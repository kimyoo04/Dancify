import SideBar from "../SideBar";
import { playlists } from "../data/playlists";

import PostHeader from "../PostItem/PostHeader";
import VideoPostList from "@scenes/Posts/Video/VideoItem/VideoPostList";
import CreateButton from "@scenes/Posts/Video/VideoItem/CreateButton";

import { useReadVideoPostsPerPage } from "@api/posts/readVideoPostsPerPage";

export default function VideoPosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadVideoPostsPerPage();

  return (
    <>
      <div className="container bg-background">
        <div className="grid grid-cols-3 lg:grid-cols-5">
          <SideBar playlists={playlists} className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full py-6 lg:px-8">
              <div className="h-full space-y-6">
                <PostHeader />

                <div className="h-full flex-col">
                  {/* 자유게시판 fetch 결과 출력 */}
                  <VideoPostList
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
        </div>
      </div>
    </>
  );
}
