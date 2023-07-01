import { Checkbox } from "@components/ui/checkbox";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

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
        <label
          htmlFor="skeleton"
          className={`text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${isMosaic ? "font-medium" : "text-muted-foreground"}`}
        >
          얼굴 모자이크 처리 유무
        </label>
      </div>
    </div>
  );
}
