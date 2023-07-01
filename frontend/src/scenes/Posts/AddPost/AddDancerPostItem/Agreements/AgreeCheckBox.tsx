import { Checkbox } from "@components/ui/checkbox";
import { postActions } from "@features/post/postSlice";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";

export default function AgreeCheckBox() {
  const dispatch = useAppDispatch();
  const isAgree = useAppSelector((state) => state.post.isAgree);

  return (
    <div className="row-center space-x-2">
      <Checkbox
        id="skeleton"
        checked={isAgree}
        onCheckedChange={() => dispatch(postActions.toggleAgree())}
        className="h-5 w-5"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="skeleton"
          className={`font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
            isAgree ? "font-medium" : "text-muted-foreground"
          }`}
        >
          개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>
    </div>
  );
}
