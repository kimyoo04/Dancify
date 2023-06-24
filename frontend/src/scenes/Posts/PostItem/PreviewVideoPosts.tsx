import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { IVideoPost } from "@type/videoPosts";

interface VideoPostsProps {
  data: IVideoPost;
  href: string;
}

export default function PreviewVideoPosts({
  data,
  href,
}: VideoPostsProps) {
  return (
    <Link href={href} className="flex-shrink-0 space-y-3 ">
      <div className="overflow-hidden rounded-md">
        {data.thumbnail && (
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={250}
            height={330}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105"
            )}
            style={{ width: `250px`, height: `330px` }}
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
