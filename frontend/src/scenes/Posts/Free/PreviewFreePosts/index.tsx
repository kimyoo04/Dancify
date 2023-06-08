import Image from "next/image";

import { cn } from "@lib/utils";

import { Album } from "../../data/albums";
import { MessageSquare, ThumbsUp } from "lucide-react";

interface PreviewFreePostsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Album;
}

export default function PreviewFreePosts({
  data,
  ...props
}: PreviewFreePostsProps) {
  return (
    <div className="w-full space-y-2 border-b p-4" {...props}>
      <div className="flex w-full items-start justify-between">
        {/* 제목과 내용 */}
        <div className="space-y-1">
          <h3 className="font-medium leading-none md:text-lg">{data.name}</h3>
          <div className="md:text-md text-sm text-muted-foreground">
            {data.artist}
          </div>
        </div>

        {/* 포스트 이미지 */}
        <div className={`w-[90px] overflow-hidden rounded-md`}>
          <Image
            src={data.cover}
            alt={data.name}
            width={90}
            height={90}
            className={cn(
              "aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
            )}
          />
        </div>
      </div>

      <div className="row-between">
        {/* 날짜와 닉네임 */}
        <div className="row-center gap-3 text-sm">
          <div className="text-sm text-muted-foreground">2023.06.06</div>
          <div>nickname</div>
        </div>

        {/* 좋아요와 댓글 개수 */}
        <div className="flex w-[90px] items-start">
          <div className="flex w-full items-center justify-start gap-1">
            <ThumbsUp className="w-3" />
            <span className="text-sm">50</span>
          </div>

          <div className="flex w-full items-center justify-start gap-1">
            <MessageSquare className="w-3" />
            <span className="text-sm">50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
