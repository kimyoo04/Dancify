import { useReadFeedbacks } from "@api/feedbacks/readFeedbacks";

import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";

export default function Feedbacks() {
  //! 데이터 받아오기
  const { data, status, error  } = useReadFeedbacks();

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">피드백 동영상</h2>
        <p className="text-sm text-muted-foreground">
          Dancify에서 안무 연습한 것을 피드백받으실 수 있습니다.
        </p>
      </div>

      {status === "loading" ? (
        <div />
      ) : status === "error" ? (
        <>{error && <p>Error: {error.message}</p>}</>
      ) : data ? (
        <DataTable data={data} columns={columns} />
      ) : (
        <PostNotFound />
      )}
    </div>
  );
}
