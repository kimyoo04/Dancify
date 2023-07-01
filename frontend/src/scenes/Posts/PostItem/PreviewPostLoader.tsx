import PreviewListWrapper from "./PreviewListWrapper";
import { cn } from "@lib/utils";
import { Skeleton } from "@components/ui/Skeleton";

export default function PreviewPostLoader() {
  const contentLoaderArr = Array.from(Array(20).keys());

  return (
    <PreviewListWrapper>
      {contentLoaderArr.map((indx) => (
        <div
          key={indx + "dummy" + "posts"}
          className="w-[250px] -space-y-2"
        >
          {/* 이미지 */}
          <div className="relative overflow-hidden rounded-md">
            <Skeleton
              className={cn(
                "aspect-[9/16] w-full rounded-md bg-gray-200 object-cover"
              )}
            />
          </div>

          <div className="flex items-start justify-start gap-3 rounded-b-md bg-gray-100 px-3 pb-3 pt-5">
            {/* 프로필 이미지 */}
            <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />

            {/* 제목 | 닉네임 */}
            <div className="space-y-1 text-sm">
              <Skeleton className="h-4 w-32 bg-gray-300 font-medium leading-none" />
              <Skeleton className="h-3 w-12 bg-gray-300 text-xs text-muted-foreground" />
            </div>
          </div>
        </div>
      ))}
    </PreviewListWrapper>
  );
}
