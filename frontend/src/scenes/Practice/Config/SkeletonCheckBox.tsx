import { Checkbox } from "@components/ui/checkbox";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function SkeletonCheckBox() {
  const dispatch = useAppDispatch();

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="skeleton"
        onCheckedChange={() => dispatch(practiceActions.toggleSkeleton())}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="skeleton"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          관절 스켈레톤 매핑 유무
        </label>
        <p className="text-sm text-muted-foreground">
          신체의 관절을 실시간으로 따라다니며 가이드를 표시합니다.
        </p>
      </div>
    </div>
  );
}
