import UpDelButton from "@scenes/Posts/PostItem/UpDelButton";
import { useAppSelector } from "@toolkit/hook";
import { IFreePostDetail } from "@type/freePosts";
import { timeYmd } from "@util/dateTime";

interface IHeaderProps {
  data: IFreePostDetail;
}

export default function Header({ data }: IHeaderProps) {
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div>
      {/* 게시글 제목 */}
      <h2 className="text-2xl font-bold">{data.title}</h2>

      {/* 작성자, 작성일, 조회수 -- 수정, 삭제 버튼 */}
      <div className="flex flex-wrap justify-between">
        <div>
          <span className="text-sm text-muted-foreground">{data.nickname}</span>
          <span className="mx-2 text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            {timeYmd(data.createDate)}
          </span>
          <span className="mx-2 text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            조회수: {data.views}
          </span>
        </div>

        {data.userId === userId && <UpDelButton postId={data.postId} />}
      </div>
    </div>
  );
}
