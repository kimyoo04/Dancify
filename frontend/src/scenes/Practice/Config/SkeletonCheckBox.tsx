import { Checkbox } from "@components/ui/checkbox";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@components/ui/tooltip";

export default function SkeletonCheckBox() {
  const dispatch = useAppDispatch();
  const isSkeleton = useAppSelector((state) => state.practice.isSkeleton);

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="skeleton"
        onCheckedChange={() => dispatch(practiceActions.toggleSkeleton())}
        className="h-4 w-4 dark:text-white"
      />
      <div className="grid gap-1.5 leading-none">
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor="skeleton"
              className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                isSkeleton ? "font-medium" : "text-muted-foreground"
              }`}
            >
              관절 스켈레톤 매핑 표시
            </label>
          </TooltipTrigger>
          <TooltipContent>
            <p>화면에 스켈레톤이 그려져요.</p>
            <p>내가 잘 추고 있는지 확인할 수 있어요.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
