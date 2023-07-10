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

  console.log(data);

  return (
    <>
      <div className="bg-background">
        <DancerPostHeader />

        {/* 자유 게시판 fetch 결과 출력 */}
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
