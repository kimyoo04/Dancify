import SortDropDown from "@components/SortDropDown";
import { Separator } from "@components/ui/separator";

export default function VideoPostHeader() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">자랑 게시판</h2>
          <p className="text-sm text-muted-foreground">
            동영상을 업로드하여 자랑하는 곳입니다.
          </p>
        </div>

        <SortDropDown />
      </div>
      <Separator className="my-4" />
    </div>
  );
}
