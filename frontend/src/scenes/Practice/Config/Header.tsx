import { IPractice } from "@type/practice";
import { timeYmd } from "@util/dateTime";

export default function ConfigHeader({
  data,
}: {
  data: IPractice["dancerPost"];
}) {
  return (
    <div>
      {/* 게시글 제목 -- 수정, 삭제 버튼 */}
      <div className="flex flex-wrap justify-between">
        <h2 className="text-xl font-bold">{data.title}</h2>
      </div>

      {/* 작성자, 작성일, 조회수 */}
      <div className="mb-8">
        <span className="text-sm text-gray_2">{data.nickname}</span>
        <span className="mx-2 text-sm text-gray_2">|</span>
        <span className="text-sm text-gray_2">{timeYmd(data.createDate)}</span>
        <span className="mx-2 text-sm text-gray_2">|</span>
      </div>
    </div>
  );
}
