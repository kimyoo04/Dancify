import SortDropDown from "@components/SortDropDown";
import { Separator } from "@components/ui/separator";

export default function HistoryPostHeader() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">
            시청기록
          </h2>
          <p className="text-sm text-muted-foreground">
            댄서 게시글을 시청한 기록을 확인할 수 있습니다.
          </p>
        </div>

          <SortDropDown />
        </div>
        <Separator className="my-4" />
    </div>
  );
}
