import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { IVideoPost } from "@type/videoPosts";
import ProfileImage from "@components/ProfileImage";

interface VideoPostsProps {
  data: IVideoPost;
  href: string;
}

export default function VideoPostItem({ data, href }: VideoPostsProps) {
  console.log(data.profileImage);

  return (
    <Link href={href} className="group transition-all hover:-translate-y-3 ">
      <div className="-space-y-2 rounded-md group-hover:shadow-md">
        <div className="relative overflow-hidden rounded-md">
          {data.thumbnail && (
            <Image
              src={data.thumbnail}
              alt={data.title}
              width={400}
              height={500}
              className={cn(
                "aspect-[9/16] w-full rounded-md bg-muted object-cover transition-all group-hover:scale-105"
              )}
            />
          )}
        </div>

        <div className="flex items-start justify-start gap-3 rounded-b-md bg-muted px-3 pb-3 pt-5">
          <ProfileImage imageUrl={data.profileImage} />
          <div className="space-y-1 text-sm">
            <h3 className="font-medium leading-none">{data.title}</h3>
            <p className="text-xs text-muted-foreground">{data.nickname}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
