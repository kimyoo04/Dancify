import { useAppSelector } from "@toolkit/hook";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "lucide-react";
import { toggleLike } from "@api/like/toggleLike";
import SignInButton from "@layouts/Header/SignInButton";
import { TPostCategory } from "@type/like";

export default function DetailMobileHeader() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userLike = useAppSelector((state) => state.like.userLike);

  const router = useRouter();
  const pathsArr = router.asPath.split("/");
  const currentPage = pathsArr.includes("free")
    ? "자유게시판"
    : pathsArr.includes("video")
    ? "자랑게시판"
    : pathsArr.includes("dnacer")
    ? "댄서게시판"
    : "";

  return (
    <div className="row-between container h-16 w-full border-b bg-background md:hidden">
      {/* 디테일 페이지 헤더 */}
      <button
        className="-ml-1.5 flex w-[66px] items-center justify-start"
        onClick={() =>
          router.push(`/posts/${pathsArr[2]}`, undefined, { scroll: false })
        }
      >
        <ChevronLeftIcon />
        <span className="text-main_color text-lg font-medium">목록</span>
      </button>

      <div className="col-center">
        <h2 className="text-main_color text-xl font-medium">{currentPage}</h2>
      </div>

      {/* 좋아요 토글 */}
      <div className="flex w-[66px] items-center justify-end">
        {isAuthenticated ? (
          <button
            onClick={() =>
              toggleLike({
                postId: pathsArr[3],
                postCategory: pathsArr[2].toUpperCase() as TPostCategory,
              })
            }
          >
            {userLike ? (
              <i className="ri-heart-fill text-2xl"></i>
            ) : (
              <i className="ri-heart-line text-2xl"></i>
            )}
          </button>
        ) : (
          <SignInButton />
        )}
      </div>
    </div>
  );
}
