import { useState } from "react";

import { Button } from "@components/ui/button";
import { MoreVerticalIcon } from "lucide-react";
import { useToast } from "@components/ui/use-toast";
import { commentActions } from "@features/comment/commentSlice";
import { IComment } from "@type/comments";
import { useAppDispatch } from "@toolkit/hook";
import { useDeleteComment } from "@api/comment/deleteComment";
import { useRouter } from "next/router";
import { TPostCategoryLower } from "@type/like";

export default function UpDelButton({ data }: { data: IComment }) {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const router = useRouter();
  const postId = router.query.id;
  const pathsArr = router.asPath.split("/");
  const { mutateAsync } = useDeleteComment(
    postId as string,
    pathsArr[1] as TPostCategoryLower
  );

  // 더보기 버튼 클릭
  const [isToggle, setIsToggle] = useState(false);
  // 삭제 버튼 활성화 state
  const [isDel, setIsDel] = useState(false);

  const handleDelete = async () => {
    try {
      mutateAsync({ commentId: data.commentId });
      toast({ title: "Success", description: "댓글이 삭제되었습니다." });
    } catch (err) {
      console.log("deleteFreePost:", err);
    }
  };

  return (
    <div className="relative h-6">
      {/* //!오버레이 */}
      {isToggle && (
        <div
          className="fixed left-0 top-0 z-10 h-screen w-screen"
          onClick={() => {
            setIsToggle(false);
            setIsDel(false);
          }}
        ></div>
      )}

      {/* //!더보기 토글 버튼 */}
      <button className="h-6" onClick={() => setIsToggle(!isToggle)}>
        <MoreVerticalIcon className="text-muted-foreground" />
      </button>

      {/* //!수정 삭제 버튼 */}
      {isToggle ? (
        <div className="absolute right-0 z-10 w-36 gap-2 rounded-md border bg-background p-2">
          {isDel ? (
            <div className="row-between w-full">
              <Button variant={"destructive"} onClick={() => handleDelete()}>
                삭제
              </Button>
              <Button variant={"outline"} onClick={() => setIsDel(false)}>
                취소
              </Button>
            </div>
          ) : (
            <div className="row-between w-full">
              <Button
                variant={"outline"}
                onClick={() =>
                  dispatch(commentActions.clickUpdate(data.commentId))
                }
              >
                수정
              </Button>
              <Button variant={"destructive"} onClick={() => setIsDel(true)}>
                삭제
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
