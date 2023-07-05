import { Button } from "@components/ui/button";
import { feedbackActions } from "@features/feedback/feedbackSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { X } from "lucide-react";
import DancerTipTap from "./DancerTipTap";

export default function TimeStampForm() {
  const dispatch = useAppDispatch();
  const { sectionIndex, sections } = useAppSelector(
    (state) => state.feedback
  );

  const dancerMsgLen = sections[sectionIndex].dancerMessage.length;
  const reversedMsg = [...sections[sectionIndex].dancerMessage].reverse();

  return (
    <div className="space-y-2">
      <ul className="m-0 space-y-4 p-0">
        {reversedMsg.map((msg, index) => (
          <div key={msg.timeStamp + "초"} className="p-2">
            <div className="flex w-full items-center justify-between">
              <div className="space-x-2">
                <label
                  htmlFor={`content${dancerMsgLen - index}`}
                  className="font-medium"
                >
                  {"#"} {dancerMsgLen - index}
                </label>
                <span className="font-medium">:</span>
                <span className="font-medium">{msg.timeStamp} 초</span>
              </div>
              {/* 해당 인덱스를 setTimeStampCount를 이용해 제거 */}
              <Button
                className="m-0 p-0"
                variant={"ghost"}
                onClick={() =>
                  dispatch(
                    feedbackActions.removeDancerMessage({
                      timeStamp: msg.timeStamp,
                    })
                  )
                }
              >
                <X size={22} className="text-red-500" />
              </Button>
            </div>

            <DancerTipTap timeStamp={msg.timeStamp} />
          </div>
        ))}
      </ul>
    </div>
  );
}
