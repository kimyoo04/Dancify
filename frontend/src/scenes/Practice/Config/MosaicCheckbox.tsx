import { Checkbox } from "@components/ui/checkbox";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";

export default function MosaicCheckbox() {
  const dispatch = useAppDispatch();
  const isMosaic = useAppSelector((state) => state.practice.isMosaic);

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="mosaic"
        onCheckedChange={() => dispatch(practiceActions.toggleMosaic())}
        className="h-4 w-4 dark:text-white"
      />
      <div className="grid gap-1.5 leading-none">
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor="mosaic"
              className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                isMosaic ? "font-medium" : "text-muted-foreground"
              }`}
            >
              얼굴 모자이크 처리 표시
            </label>
          </TooltipTrigger>
          <TooltipContent>
            <p>얼굴이 모자이크 처리된 뒤 영상이 저장됩니다.</p>
            <p>사생활을 안전하게 보호할 수 있어요!</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
