import GenreButtons from "@components/GenreButtons";
import DancerPostHeader from "./DancerItem/DancerPostHeader";
import DancerPostList from "@scenes/Posts/Dancer/DancerItem/DancerPostList";

import { useReadDancerPostsPerPage } from "@api/posts/readDancerPostsPerPage";

import { useAppSelector } from "@toolkit/hook";
import CreateButton from "../PostItem/CreateButton";

export default function DancerPosts() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadDancerPostsPerPage();

  const isDancer = useAppSelector((state) => state.auth.isDancer);

  return (
    <>
      <div className="bg-background">
        <GenreButtons />

        <DancerPostHeader />

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

        {/* 게시글 추가 버튼 */}
        {isDancer && <CreateButton category="dance" />}
      </div>
    </>
  );
}
