import Image from "next/image";
import Link from "next/link";

import { cn } from "@lib/utils";
import { Eye, MessageSquare, ThumbsUp } from "lucide-react";
import { IFreePost } from "@type/freePosts";
import { timeYmd } from "@util/dateTime";
import PostContent from "@scenes/Posts/PostItem/PostContent";
import extractPTags from "@util/extractPTags";

interface FreePostItemProps {
  data: IFreePost;
}

export default function FreePostItem({ data }: FreePostItemProps) {
  return (
    <Link
      href={`/posts/free/${data.postId}`}
      className="w-full space-y-2 border-b pb-4"
    >
      <div className="flex w-full flex-nowrap items-start justify-between">
        {/* 제목 | 내용 */}
        <div className="w-fit space-y-1">
          <h3 className="text-lg font-medium leading-none">{data.title}</h3>
          <PostContent
            content={extractPTags(data.content) + "..."}
            textClassName="w-fit text-sm text-muted-foreground"
          />
        </div>

        {/* 포스트 이미지 */}
        <div
          className={`h-[70px] w-[110px] flex-shrink-0 overflow-hidden rounded-md`}
        >
          {data.postImage && (
            <Image
              src={data.postImage}
              alt={data.title}
              width={110}
              height={70}
              className={cn(
                "aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
              )}
            />
          )}
        </div>
      </div>

      <div className="row-between">
        {/* 날짜 | 닉네임 | 조회수 */}
        <div className="row-center gap-3 text-sm">
          <span className="text-sm text-muted-foreground">
            {timeYmd(data.createDate)}
          </span>
          <span>{data.nickname}</span>
        </div>

        {/* 좋아요 | 댓글 개수 */}
        <div className="flex items-start gap-4">
          <div className="flex w-full items-center justify-start gap-1">
            <Eye className="w-4 font-thin" />
            <span className="mb-0.5 text-sm">{data.views}</span>
          </div>

          <div className="flex w-full items-center justify-start gap-1">
            <ThumbsUp className="w-3" />
            <span className="mb-0.5 text-sm">{data.likesCount}</span>
          </div>

          <div className="flex w-full items-center justify-start gap-1">
            <MessageSquare className="w-3" />
            <span className="mb-0.5 text-sm">{data.commentsCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
