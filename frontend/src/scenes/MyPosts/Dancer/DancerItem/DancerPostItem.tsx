import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { IDancerPost } from "@type/dancerPosts";

interface DancerPostsProps {
  data: IDancerPost;
  width: number;
  height: number;
}

export default function DancerPostItem({
  data,
  width,
  height,
}: DancerPostsProps) {
  return (
    <Link href={`/dancer/${data.postId}`} className="space-y-3">
      <div className="overflow-hidden rounded-md bg-gray-100">
        {data.thumbnail && (
          <Image
            // src={"" ||data.thumbnail}
            src={""} // 임시
            alt={data.title}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              "aspect-[3/4]"
            )}
          />
        )}
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{data.title}</h3>
        <p className="text-xs text-muted-foreground">{data.nickname}</p>
      </div>
    </Link>
  );
}
