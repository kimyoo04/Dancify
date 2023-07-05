import Link from "next/link";
import { useState } from "react";
import { TFeedbackId } from "@type/feedbacks";

import { Button } from "@components/ui/button";
import { MoreVerticalIcon } from "lucide-react";

import { useDeleteFeedback } from "@api/feedbacks/deleteFeedback";

export default function UpDelButton({feedbackId}: { feedbackId: TFeedbackId }) {
  // 더보기 버튼 클릭
  const [isToggle, setIsToggle] = useState(false);
  // 삭제 버튼 활성화 state
  const [isDel, setIsDel] = useState(false);

  const { mutateAsync } = useDeleteFeedback();

  return (
    <div className="relative h-6">
      {/* 오버레이 */}
      {isToggle && (
        <div
          className="fixed left-0 top-0 z-10 h-screen w-screen"
          onClick={() => {
            setIsToggle(false);
            setIsDel(false);
          }}
        ></div>
      )}

      {/* 더보기 토글 버튼 */}
      <button className="h-6" onClick={() => setIsToggle(!isToggle)}>
        <MoreVerticalIcon className="text-muted-foreground" />
      </button>

      {/* 수정 삭제 버튼 */}
      {isToggle ? (
        <div className="absolute right-0 z-10 rounded-md border bg-background p-2">
          {isDel ? (
            <div className="row-between w-full">
              <Button variant={"destructive"} onClick={() => mutateAsync(feedbackId)}>
                삭제
              </Button>
              <Button variant={"outline"} onClick={() => setIsDel(false)}>
                취소
              </Button>
            </div>
          ) : (
              <Button variant={"destructive"} onClick={() => setIsDel(true)}>
                삭제
              </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
