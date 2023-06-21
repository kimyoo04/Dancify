import GenreButtons from "@components/GenreButtons";
import VideoPostHeader from "./VideoItem/VideoPostHeader";
import VideoPostList from "@scenes/Posts/Video/VideoItem/VideoPostList";

import { useReadVideoPostsPerPage } from "@api/posts/readVideoPostsPerPage";
import CreateButton from "../PostItem/CreateButton";

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
        <GenreButtons />

        <VideoPostHeader />

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
        <CreateButton category="video" />
      </div>
    </>
  );
}
