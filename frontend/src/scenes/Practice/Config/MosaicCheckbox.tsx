import { Checkbox } from "@components/ui/checkbox";
import { practiceActions } from "@features/practice/practiceSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

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
        <label
          htmlFor="mosaic"
          className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            isMosaic ? "font-medium" : "text-muted-foreground"
          }`}
        >
          얼굴 모자이크 처리 유무
        </label>
      </div>
    </div>
  );
}
