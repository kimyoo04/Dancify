import VideoPostHeader from "./VideoItem/VideoPostHeader";
import VideoPostList from "@scenes/VideoPosts/VideoItem/VideoPostList";
import CreateButton from "@scenes/Posts/PostItem/CreateButton";

import { useReadVideoPostsPerPage } from "@api/posts/readVideoPostsPerPage";
import SearchHeader from "@components/Search/SearchHeader";

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
      <div className="bg-background">
        <SearchHeader />

        <VideoPostHeader />

        {/* 자유 게시판 fetch 결과 출력 */}
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
        <CreateButton category="video" />
      </div>
    </>
  );
}
