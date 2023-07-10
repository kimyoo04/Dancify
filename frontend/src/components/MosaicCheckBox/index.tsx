import { Checkbox } from "@components/ui/checkbox";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";

export default function MosaicCheckBox() {
  const dispatch = useAppDispatch();
  const isMosaic = useAppSelector((state) => state.post.isMosaic);

  return (
    <div className="flex items-center justify-end space-x-2">
      <Checkbox
        id="skeleton"
        checked={isMosaic}
        onCheckedChange={() => dispatch(postActions.toggleMosaic())}
        className="h-4 w-4"
      />
      <div className="grid gap-1.5 leading-none">
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor="skeleton"
              className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                isMosaic ? "font-medium" : "text-muted-foreground"
              }`}
            >
              얼굴 모자이크 처리 표시
            </label>
          </TooltipTrigger>
          <TooltipContent>
            <p>얼굴이 모자이크 처리된 뒤 영상이 업로드됩니다.</p>
            <p>사생활을 안전하게 보호할 수 있어요!</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
