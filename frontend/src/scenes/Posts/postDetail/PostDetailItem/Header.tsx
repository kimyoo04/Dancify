import { IPostData } from "@type/posts";
import { timeYmd } from "@util/dateTime";

interface IHeaderProps {
  data: IPostData;
}

export default function Header({ data }: IHeaderProps) {
  return (
    <div>
      {/* 게시글 제목 -- 수정, 삭제 버튼 */}
      <div className="flex flex-wrap justify-between">
        <h2 className="text-2xl font-bold">{data.title}</h2>
      </div>

      {/* 작성자, 작성일, 조회수 */}
      <div className="mb-8">
        <span className="text-gray_2 text-sm">{data.username}</span>
        <span className="text-gray_2 mx-2 text-sm">|</span>
        <span className="text-gray_2 text-sm">{timeYmd(data.createdAt)}</span>
        <span className="text-gray_2 mx-2 text-sm">|</span>
        <span className="text-gray_2 text-sm">조회수: {data.views}</span>
      </div>
    </div>
  );
}
