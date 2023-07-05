import SortDropDown from "@components/SortDropDown";
import { Separator } from "@components/ui/separator";

export default function FreePostHeader() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">자유게시판</h2>
          <p className="text-sm text-muted-foreground">
            자유롭게 글과 댓글을 통해 소통할 수 있습니다.
          </p>
        </div>

        <SortDropDown />
      </div>
      <Separator className="my-4" />
    </div>
  );
}
