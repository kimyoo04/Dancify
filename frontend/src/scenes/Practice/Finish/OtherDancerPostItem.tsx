import Image from "next/image";
import { cn } from "@lib/utils";
import Link from "next/link";
import { IDancerPost } from "@type/practice";

export default function OtherDancerPostItem({ data }: { data: IDancerPost }) {
  return (
    <Link
      href={`/dancer/${data.postId}`}
      className="flex-shrink-0 space-y-3 shadow-md"
    >
      {/* //? 영상으로 대체 가능하면 대체할 것 */}
      {data.thumbnail && (
        <div className={`cursor-pointer overflow-hidden rounded-md`}>
          <Image
            src={data.thumbnail}
            alt={data.title + data.nickname}
            width={250}
            height={330}
            className={cn(
              "h-auto w-auto scale-105 object-cover transition-all hover:scale-110"
            )}
            style={{ width: `250px`, height: `400px` }}
          />
        </div>
      )}
    </Link>
  );
}
