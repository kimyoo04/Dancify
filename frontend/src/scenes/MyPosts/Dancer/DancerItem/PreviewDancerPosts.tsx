import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { IDancerPost } from "@type/dancerPosts";

interface DancerPostsProps {
  data: IDancerPost;
  width: number;
  height: number;
}

export default function PreviewDancerPosts({
  data,
  width,
  height,
}: DancerPostsProps) {
  return (
    <Link href={`/posts/dancer/${data.postId}`} className="space-y-3 flex-shrink-0">
      <div className="overflow-hidden rounded-md bg-gray-100">
        {data.thumbnail && (
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={width}
            height={height}
            className={cn(
              "aspect-[3/4] h-auto w-auto object-cover transition-all hover:scale-105"
            )}
            style={{ width: `${width}px`, height: `${height}px` }}
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
