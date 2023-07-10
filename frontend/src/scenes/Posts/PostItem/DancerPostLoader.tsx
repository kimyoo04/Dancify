import DancerListWrapper from "./DancerListWrapper";
import { cn } from "@lib/utils";
import { Skeleton } from "@components/ui/Skeleton";

export default function DancerPostLoader() {
  const contentLoaderArr = Array.from(Array(20).keys());

  return (
    <DancerListWrapper>
      {/* //! 댄서 게시판 검색결과 무한 스크롤 영역 */}
      {contentLoaderArr.map((data, indx) => (
        <div
          key={indx + "dummy" + "posts"}
          className="group -space-y-2 transition-all hover:-translate-y-3"
        >
          <div className="relative overflow-hidden rounded-md">
            <Skeleton
              className={cn(
                "aspect-[9/16] w-full rounded-md bg-gray-200 object-cover transition-all"
              )}
            />
          </div>

          <div className="flex items-start justify-start gap-3 rounded-b-md bg-gray-100 px-3 pb-3 pt-5">
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />

            <div className="space-y-1 text-sm">
              <Skeleton className="h-4 w-32 bg-gray-300 font-medium leading-none" />
              <Skeleton className="h-3 w-12 bg-gray-300 text-xs text-muted-foreground" />
            </div>
          </div>
        </div>
      ))}
    </DancerListWrapper>
  );
}
