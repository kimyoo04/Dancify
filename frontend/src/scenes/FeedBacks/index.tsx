import { useReadFeedbacks } from "@api/feedbacks/readFeedbacks";

import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable/data-table";
import PostNotFound from "@scenes/Posts/PostItem/PostNotFound";

export default function Feedbacks() {
  //! 데이터 받아오기
  const { data, status, error  } = useReadFeedbacks();

  return (
    <div>
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
