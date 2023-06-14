import { useAppSelector } from "@toolkit/hook";
import { IComment } from "@type/comments";
import { timeYmd } from "@util/dateTime";

import CommentInput from "./CommentInput";
import UpDelButton from "./UpDelButton";

export default function CommentItem({ data }: { data: IComment }) {
  const { isUpdate, commentId } = useAppSelector((state) => state.comment);

  return (
    <>
      {isUpdate && commentId === data.commentId ? (
        <CommentInput content={data.content} />
      ) : (
        <div className="relative w-full border-b py-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-start justify-start">
                {/* 작성자 이름 */}
                <div className="w-40 overflow-hidden">
                  <span className="truncate">{data.nickname}</span>
                </div>

                {/* 작성 시간 : timeYmd 함수 활용 */}
                <span className="text-sm text-slate-400">
                  {timeYmd(data.createDate)}
                </span>
              </div>
            </div>

            {/* 더보기 버튼 */}
            <UpDelButton data={data} />
          </div>

          {/* 댓글 내용 */}
          <p className="pb-3 pt-2">{data.content}</p>
        </div>
      )}
    </>
  );
}
