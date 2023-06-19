import GenreButtons from "@components/GenreButtons";

import { useReadViewHistoriesPerPage } from "@api/histories/readDancerHistoriesPerPage";

import DancerPostHeader from "./DancerItem/DancerPostHeader";
import DancerPostList from "./DancerItem/DancerPostList";

export default function Histories() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useReadViewHistoriesPerPage();

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
      </div>
    </>
  );
}
