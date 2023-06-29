import { Button } from "@components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import PostLink from "./PostLink";

export default function PostHeader() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">커뮤니티</h1>

      <div className="row-center">
        {/* 게시판 고르는 탭 목록 */}
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
          <PostLink href="/posts" text="전체"></PostLink>
          <PostLink href="/video" text="자랑게시판"></PostLink>
          <PostLink href="/free" text="자유게시판"></PostLink>
        </div>

        {/* 게시글 쓰기 버튼*/}
        <Link href={"/storage"} className="ml-auto">
          <Button className="row-center gap-2">
            <ShoppingBag className="h-4 w-4 dark:text-white" />
            내 보관함
          </Button>
        </Link>
      </div>
    </div>
  );
}
