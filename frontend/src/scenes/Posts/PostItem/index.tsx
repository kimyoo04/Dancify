import { IPostData } from "@type/posts";
import { timeYmd } from "@util/dateTime";
import { truncateString } from "@util/truncateString";
import Link from "next/link";

export default function PostItem({ post }: { post: IPostData }) {
  return (
    // postDetail로 링크
    <Link
      href={`/posts/${post.postId}`}
      className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-md"
    >
      {/* 유저 이름 */}
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm text-gray-500">{post.username}</div>
      </div>

      {/* 제목과 잘린 내용 */}
      <div>
        <div className="mb-2 text-lg font-bold">{post.title}</div>
        <div className="overflow-hidden text-gray-800">
          {truncateString(post.content, 40)}
        </div>
      </div>

      {/* 생성날짜 */}
      <div className="mt-4 flex justify-between">
        <div className="text-sm text-gray-500">조회 {post.views}</div>
        <div className="text-sm text-gray-500">{timeYmd(post.createdAt)}</div>
      </div>
    </Link>
  );
}
