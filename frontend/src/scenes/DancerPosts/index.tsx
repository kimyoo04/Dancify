import GenreButtons from "@components/GenreButtons";
import DancerPostHeader from "./DancerItem/DancerPostHeader";
import DancerPostList from "@scenes/DancerPosts/DancerItem/DancerPostList";
import CreateButton from "@scenes/Posts/PostItem/CreateButton";

import { useReadDancerPostsPerPage } from "@api/posts/readDancerPostsPerPage";

import { useAppSelector } from "@toolkit/hook";
import SearchHeader from "@components/Search/SearchHeader";

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
        <SearchHeader />

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
        {isDancer && <CreateButton category="dancer" />}
      </div>
    </>
  );
}
