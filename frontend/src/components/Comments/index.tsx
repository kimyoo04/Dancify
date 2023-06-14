import { IComment } from "@type/comments";
import CommentInput from "./CommentInput";
import { useAppSelector } from "@toolkit/hook";
import CommentItem from "./CommentItem";

export default function Comments({ data }: { data: IComment[] }) {
  const isUpdate = useAppSelector((state) => state.comment.isUpdate);

  return (
    <div className="w-full rounded-md">
      {/* 댓글 목록 */}
      {data &&
        data.map((commentData) => (
          <CommentItem key={commentData.commentId} data={commentData} />
        ))}

      {/* 댓글 입력 필드 */}
      {!isUpdate && <CommentInput />}
    </div>
  );
}
