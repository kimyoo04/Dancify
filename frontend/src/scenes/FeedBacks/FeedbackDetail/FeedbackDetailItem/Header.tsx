import { useAppSelector } from "@toolkit/hook";
import { IFeedbackDetail } from "@type/feedbacks";
import { timeYmd } from "@util/dateTime";
import UpDelButton from "./UpDelButton";

interface IHeaderProps {
  data: IFeedbackDetail;
}

export default function Header({ data }: IHeaderProps) {
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <div>
      {data && <>
        {/* 게시글 제목 */}
        <h2 className="text-xl font-bold">{data.title}</h2>

        {/* 작성자, 작성일, 조회수 -- 수정, 삭제 버튼 */}
        <div className="flex flex-wrap items-center justify-between">
          <div className="mb-3">
            <span className="text-sm text-muted-foreground">
              {data.nickname}
            </span>
            <span className="mx-2 text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">
              {timeYmd(data.createDate)}
            </span>
          </div>

          <div className="row-center gap-2">
            {data.userId === userId && (
              <UpDelButton feedbackId={data.feedbackId} />
            )}
          </div>
        </div>
      </>}
    </div>
  );
}
