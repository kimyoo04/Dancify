import ScrollButton from "@components/ScrollButton";
import { FileBarChart2 } from "lucide-react";
import { Book, Heart, Home, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function TabBar() {
  return (
    <>
      {/* 최상단 이동 버튼 */}
      <ScrollButton />

      {/* 탭바 영역 */}
      <div className="container fixed bottom-0 grid h-16 w-screen grid-cols-5 justify-between border-t bg-background md:hidden">
        <Link href="/" className="col-center">
          <Home />
          <span className="text-xs">홈</span>
        </Link>
        <Link href="/posts" className="col-center">
          <Book />
          <span className="text-xs">커뮤니티</span>
        </Link>
        <Link href="/feedbacks" className="col-center">
          <FileBarChart2 />
          <span className="text-xs">피드백</span>
        </Link>
        <Link href="/likes" className="col-center">
          <Heart />
          <span className="text-xs">좋아요</span>
        </Link>
        <Link href="/storage" className="col-center">
          <ShoppingBagIcon />
          <span className="text-xs">보관함</span>
        </Link>
      </div>
    </>
  );
}
