import { practiceActions } from "@features/practice/practiceSlice";
import { cn } from "@lib/utils";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { ISection } from "@type/practice";
import Image from "next/image";

export default function PreviewSection({
  data,
  index,
}: {
  data: ISection;
  index: number;
}) {
  const dispatch = useAppDispatch();
  const selectedSections = useAppSelector(
    (state) => state.practice.selectedSections
  );

  return (
    <div className="flex-shrink-0 space-y-3">
      {/* //? 영상으로 대체 가능하면 대체할 것 */}
      {data.thumbnail && (
        <div
          className={`${
            selectedSections.includes(data.sectionId)
              ? "border-2 border-primary opacity-100"
              : "border-2 opacity-60"
          } cursor-pointer overflow-hidden rounded-md`}
          onClick={() =>
            dispatch(practiceActions.toggleSelectedSections(data.sectionId))
          }
        >
          <Image
            src={data.thumbnail}
            alt={index + "-thumbnail-" + data.sectionId}
            width={250}
            height={330}
            className={cn(
              "h-auto w-auto scale-105 object-cover transition-all hover:scale-110"
            )}
            style={{ width: `250px`, height: `330px` }}
          />
        </div>
      )}

      {/* //? 영상 길이와 구간 번호 표시 */}
      <div className="row-center w-full">
        <span className="text-sm font-medium leading-none">
          {index} 구간
        </span>
      </div>
    </div>
  );
}
