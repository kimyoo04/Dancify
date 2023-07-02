import { Skeleton } from "@components/ui/Skeleton";

export default function FreePostLoader() {
  const contentLoaderArr = Array.from(Array(15).keys());

  return (
    <ul className="grid w-full grid-cols-1 gap-4">
      {contentLoaderArr.map((indx) => (
        <div
          key={indx + "dummy" + "preview"}
          className="group w-full space-y-2 border-b pb-4"
        >
          <div className="flex w-full flex-nowrap items-start justify-between">
            {/* 제목 | 내용 */}
            <div className="w-fit space-y-1">
              <Skeleton className="h-7 w-[150px] rounded-md bg-gray-200" />
              <Skeleton className="h-5 w-[300px] rounded-md bg-gray-200" />
            </div>

            {/* 포스트 이미지 */}
            <Skeleton
              className={`h-[70px] w-[110px] flex-shrink-0 overflow-hidden rounded-md bg-gray-200`}
            />
          </div>

          <div className="row-between">
            {/* 프로필 이미지 | 생성일 | 닉네임 */}
            <div className="row-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />

              <div className="col-start gap-1 text-sm">
                <Skeleton className="h-3 w-16 rounded-full bg-gray-300" />
                <Skeleton className="h-3 w-10 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* 좋아요 | 댓글 개수 */}
            <div className="flex items-start gap-4">
              <Skeleton className="h-3 w-[110px] rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
}
