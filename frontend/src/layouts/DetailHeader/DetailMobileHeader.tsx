import { useAppSelector } from "@toolkit/hook";
import { useRouter } from "next/router";
import { ChevronLeftIcon, Share2 } from "lucide-react";
import SignInButton from "@layouts/Header/SignInButton";
import { useToast } from "@components/ui/use-toast";

export default function DetailMobileHeader() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const { toast } = useToast();

  const pathsArr = router.asPath.split("/");
  const currentPage = pathsArr.includes("free")
    ? "자유 게시판"
    : pathsArr.includes("video")
    ? "자랑 게시판"
    : pathsArr.includes("dancer")
    ? "댄서 게시판"
    : pathsArr.includes("likes")
    ? "좋아요 게시글 목록"
    : "";

  function shareLink() {
    navigator.clipboard.writeText(router.asPath); // 링크 복사
    toast({ title: "Success", description: "링크가 복사되었습니다." });
    console.log(router.asPath);
  }

  return (
    <div className="container grid h-16 w-full grid-cols-3 border-b bg-background md:hidden">
      {/* 목록 이동 버튼 */}
      <button
        className="-ml-1.5 flex w-[66px] items-center justify-start"
        onClick={() =>
          router.push(`/posts/${pathsArr[2]}`, undefined, { scroll: false })
        }
      >
        <ChevronLeftIcon />
        <span className="text-main_color text-lg font-medium">목록</span>
      </button>

      {/* 상세 페이지명 */}
      <div className="col-center">
        <h2 className="text-main_color text-xl font-medium">{currentPage}</h2>
      </div>

      {/* 공유 버튼 */}
      <button className="flex items-center justify-end" onClick={shareLink}>
        {isAuthenticated ? <Share2 /> : <SignInButton />}
      </button>
    </div>
  );
}
