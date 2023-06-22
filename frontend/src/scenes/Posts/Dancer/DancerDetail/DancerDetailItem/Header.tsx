import { IVideoPostDetail } from "@type/videoPosts";
import { timeYmd } from "@util/dateTime";

interface IHeaderProps {
  data: IVideoPostDetail;
}

export default function DancerHeader({ data }: IHeaderProps) {
  return (
    <div>
      {/* 게시글 제목 -- 수정, 삭제 버튼 */}
      <div className="flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
      </div>

      {/* 작성자, 작성일, 조회수 */}
      <div className="mb-8">
        <span className="text-sm text-gray_2">{data.nickname}</span>
        <span className="mx-2 text-sm text-gray_2">|</span>
        <span className="text-sm text-gray_2">{timeYmd(data.createDate)}</span>
        <span className="mx-2 text-sm text-gray_2">|</span>
        <span className="text-sm text-gray_2">조회수: {data.views}</span>
      </div>
    </div>
  );
}
