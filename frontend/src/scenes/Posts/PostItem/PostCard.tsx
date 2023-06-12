import { IFreePost } from "@type/freePosts";
import { IVideoPost } from "@type/videoPosts";
import { timeYmd } from "@util/dateTime";
import { truncateString } from "@util/truncateString";
import Link from "next/link";
import { isVideoPost } from "./isPostCategory";

export default function PostCard({ data }: { data: IFreePost | IVideoPost }) {
  return (
    // postDetail로 링크
    <Link
      href={`/posts/${isVideoPost(data) && data.thumbnail ? "video" : "free"}/${
        data.postId
      }`}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md"
    >
      {/* 유저 이름 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-gray-500">{data.nickname}</div>
      </div>

      {/* 제목과 잘린 내용 */}
      <div>
        <div className="mb-2 text-lg font-bold">{data.title}</div>
        <div className="overflow-hidden text-gray-800">
          {truncateString(data.content, 40)}
        </div>
      </div>

      {/* 생성날짜 */}
      <div className="mt-4 flex justify-between">
        <div className="text-sm text-gray-500">조회 {data.views}</div>
        <div className="text-sm text-gray-500">{timeYmd(data.createDate)}</div>
      </div>
    </Link>
  );
}
