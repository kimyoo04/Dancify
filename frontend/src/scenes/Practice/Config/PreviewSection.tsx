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
  const dispatch = useAppDispatch()
  const selectedSections = useAppSelector(state => state.practice.selectedSections)

  return (
    <div className="flex-shrink-0 space-y-3">
      {/* //? 영상으로 대체 가능하면 대체할 것 */}
      {data.thumbnail && (
        <div className={`${selectedSections.includes(index) && "border-2 border-primary"} cursor-pointer`} onClick={() => dispatch(practiceActions.toggleSelectedSections(index))}>
          <Image
            src={data.thumbnail}
            alt={index + "-thumbnail-" + data.sectionId}
            width={250}
            height={330}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105"
            )}
            style={{ width: `250px`, height: `330px` }}
          />
        </div>
      )}

      {/* //? 영상 길이와 구간 번호 표시 */}
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{index + 1}</h3>
      </div>
    </div>
  );
}
