import SortDropDown from "@components/SortDropDown";
import { Separator } from "@components/ui/separator";

export default function DancerPostHeader() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">시청기록</h2>
        </div>

        <SortDropDown />
      </div>
      <Separator className="my-4" />
    </div>
  );
}
