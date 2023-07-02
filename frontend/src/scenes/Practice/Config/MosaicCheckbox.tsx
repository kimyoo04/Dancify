import { Checkbox } from "@components/ui/checkbox";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch } from "@toolkit/hook";

export default function MosaicCheckbox() {
  const dispatch = useAppDispatch();

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        id="skeleton"
        onCheckedChange={() => dispatch(practiceActions.toggleMosaic())}
        className="w-5 h-5 dark:text-white"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="skeleton"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          얼굴 모자이크 처리 유무
        </label>
      </div>
    </div>
  );
}
