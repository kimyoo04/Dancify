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
      <div className="overflow-hidden">
        {data.thumbnail && (
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover rounded-md transition-all hover:scale-105"
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
