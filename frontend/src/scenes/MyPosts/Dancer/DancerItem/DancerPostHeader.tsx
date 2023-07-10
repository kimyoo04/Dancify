import SortDropDown from "@components/SortDropDown";
import { Separator } from "@components/ui/separator";

export default function DancerPostHeader() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">댄서 게시판</h2>
          <p className="text-sm text-muted-foreground">
            댄서의 안무를 따라하고, 교정받을 수 있습니다.
          </p>
        </div>

        <SortDropDown />
      </div>
      <Separator className="my-4" />
    </div>
  );
}
