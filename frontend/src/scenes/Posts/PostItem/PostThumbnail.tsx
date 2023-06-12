import { IFreePost } from "@type/freePosts";
import { TPostImage } from "@type/posts";
import { IVideoPost } from "@type/videoPosts";
import { timeYmd } from "@util/dateTime";
import { truncateString } from "@util/truncateString";
import Image from "next/image";
import Link from "next/link";
import { isFreePost, isVideoPost } from "./isPostCategory";

export default function PostThumbnail({
  data,
}: {
  data: IVideoPost | IFreePost;
}) {
  return (
    // post detail로 링크
    <Link
      href={`/posts/free/${data.postId}`}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md"
    >
      {/* 포스트이미지 혹은 영상의 썸네일이미지 */}
      {isVideoPost(data) && data.thumbnail ? (
        <Image
          src={data.thumbnail as TPostImage}
          width={500}
          height={500}
          alt={data.title}
        />
      ) : isFreePost(data) && data.postImage ? (
        <Image
          src={data.postImage as TPostImage}
          width={500}
          height={500}
          alt={data.title}
        />
      ) : null}

      {/* 작성자명과 작성일자 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-gray-500">{data.nickname}</div>
      </div>
      {/* 제목과 내용 */}
      <div>
        <div className="mb-2 text-lg font-bold">{data.title}</div>
        <div className="overflow-hidden text-gray-800">
          {truncateString(data.content, 40)}
        </div>
      </div>
      {/* 조회와 댓글 */}
      <div className="mt-4 flex justify-between">
        <div className="text-sm text-gray-500">
          조회 {data.views} · 댓글 {data.commentsCount}
        </div>
        <div className="text-sm text-gray-500">{timeYmd(data.createDate)}</div>
      </div>
    </Link>
  );
}
