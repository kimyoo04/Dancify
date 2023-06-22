import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { IVideoPost } from "@type/videoPosts";

interface VideoPostsProps {
  data: IVideoPost;
  href: string;
}

export default function VideoPostItem({
  data,
  href
}: VideoPostsProps) {
  return (
    <Link href={href} className="space-y-3 overflow-hidden group hover:-translate-y-5  transition-all">
      <div className="overflow-hidden rounded-md">
        {data.thumbnail && (
          <Image
            src={data.thumbnail}
            alt={data.title}
            width={400}
            height={500}
            className={cn(
              "h-auto w-auto object-cover rounded-md transition-all group-hover:scale-105"
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
