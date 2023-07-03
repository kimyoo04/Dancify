import Image from "next/image";
import { cn } from "@lib/utils";
import Link from "next/link";
import { IDancerPost } from "@type/practice";
import ProfileImage from "@components/ProfileImage";

export default function OtherDancerPostItem({ data }: { data: IDancerPost }) {
  return (
    <Link
      href={`/dancer/${data.postId}`}
      className="flex-shrink-0 space-y-3 shadow-md rounded-md"
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
            style={{ width: `220px`, height: `300px` }}
          />
        </div>
      )}

      <div className="flex items-start justify-start gap-3 rounded-b-md bg-muted px-3 pb-3 pt-5 group-hover:shadow-md">
        <ProfileImage imageUrl={data.profileImage} />

        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">{data.title}</h3>
          <p className="text-xs text-muted-foreground">{data.nickname}</p>
        </div>
      </div>
    </Link>
  );
}
