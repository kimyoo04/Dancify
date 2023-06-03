import ScrollButton from "@components/ScrollButton";
import Link from "next/link";

export default function Posts() {
  return (
    <div className="w-full">
      <Link href="/posts/free">자유게시판</Link>
      <Link href="/posts/video">영상자랑게시판</Link>

      {/* 최상단 이동 버튼 */}
      <ScrollButton />
    </div>
  );
}
