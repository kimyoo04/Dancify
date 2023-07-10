import ScrollButton from "@components/ScrollButton";
import { FileBarChart2, Users } from "lucide-react";
import { Heart, Home, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import FAQButton from "./FAQButton";

export default function TabBar() {
  const router = useRouter();
  const pathArr = router.pathname.split("/");
  const isActive =  (condition:boolean) => condition ? "text-primary" : "text-muted-foreground";
  return (
    <>
      {/* 최상단 이동 버튼 */}
      <ScrollButton />
      <FAQButton />

      {/* 탭바 영역 */}
      <div className="container fixed bottom-0 z-20 grid h-16 w-screen grid-cols-5 justify-between border-t bg-background md:hidden">
        <Link href="/" className="col-center">
          <Home className={`${isActive(router.pathname === "/")}`} />
          <span className={`${router.pathname === "/"} text-xs`}>홈</span>
        </Link>
        <Link href="/posts" className="col-center">
          <Users
            className={`${isActive(
              pathArr.includes("dancer") ||
                pathArr.includes("video") ||
                pathArr.includes("free") ||
                pathArr.includes("posts")
            )}`}
          />
          <span
            className={`${isActive(
              pathArr.includes("dancer") ||
                pathArr.includes("video") ||
                pathArr.includes("free") ||
                pathArr.includes("posts")
            )} text-xs`}
          >
            커뮤니티
          </span>
        </Link>
        <Link href="/feedbacks" className="col-center">
          <FileBarChart2
            className={`${isActive(pathArr.includes("feedbacks"))}`}
          />
          <span
            className={`${isActive(pathArr.includes("feedbacks"))} text-xs`}
          >
            피드백
          </span>
        </Link>
        <Link href="/likes" className="col-center">
          <Heart className={`${isActive(pathArr.includes("likes"))}`} />
          <span className={`${isActive(pathArr.includes("likes"))} text-xs`}>
            좋아요
          </span>
        </Link>
        <Link href="/storage" className="col-center">
          <ShoppingBagIcon
            className={`${isActive(pathArr.includes("storage"))}`}
          />
          <span className={`${isActive(pathArr.includes("storage"))} text-xs`}>
            보관함
          </span>
        </Link>
      </div>
    </>
  );
}
