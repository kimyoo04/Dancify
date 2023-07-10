import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { linksData } from "./linksData";
import { useAppDispatch, useAppSelector } from "@toolkit/hook";
import { FileBarChart2, Heart, Home, Tv, User, Users } from "lucide-react";
import { History } from "lucide-react";
import { Separator } from "@components/ui/separator";
import { searchActions } from "@features/search/searchSlice";

export default function Navigation({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const pathArr = router.pathname.split("/");
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);
  const userId = useAppSelector((state) => state.auth.userId);

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(searchActions.resetKeyword()); // 검색 키워드 초기화
  };

  return (
    <>
      {isOpen ? (
        <nav
          className={cn(
            "fixed left-0 hidden h-screen w-[200px] flex-shrink-0 border-r px-4 pb-3 pt-[78px] md:block",
            className
          )}
        >
          <div className="col-start w-[168px] gap-2">
            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[0].path}`}
            >
              <Button
                variant={
                  router.pathname === "/" ||
                  (router.pathname.includes("dancer") &&
                    !router.pathname.includes("likes"))
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <Home className="mr-6" />
                {linksData[0].name}
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[1].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[1].path) &&
                  !router.pathname.includes("likes")
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <Tv className="mr-6" />
                {linksData[1].name}
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[2].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[2].path) &&
                  !router.pathname.includes("likes")
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <Users className="mr-6" />
                {linksData[2].name}
              </Button>
            </Link>

            <Separator />

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[3].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[3].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <FileBarChart2 className="mr-6" />
                {linksData[3].name}
              </Button>
            </Link>

            <Separator />

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[4].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[4].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <Heart className="mr-6" />
                {linksData[4].name}
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[5].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[5].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <History className="mr-6" />
                {linksData[5].name}
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[6].path}/${userId}`}
            >
              <Button
                variant={
                  router.pathname === "/posts/[id]" ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <User className="mr-6" />
                {linksData[6].name}
              </Button>
            </Link>
          </div>
        </nav>
      ) : (
        <nav
          className={cn(
            "fixed left-0 hidden h-screen w-[72px] flex-shrink-0 border-r px-4 pb-3 pt-[78px] md:block",
            className
          )}
        >
          <div className="col-center w-10 gap-2">
            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[0].path}`}
            >
              <Button
                variant={
                  router.pathname === "/" ||
                  (router.pathname.includes("dancer") &&
                    !router.pathname.includes("likes"))
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <Home className="" />
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[1].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[1].path) &&
                  !router.pathname.includes("likes")
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <Tv className="" />
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[2].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[2].path) &&
                  !router.pathname.includes("likes")
                    ? "default"
                    : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <Users className="" />
              </Button>
            </Link>

            <Separator />

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[3].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[3].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <FileBarChart2 className="" />
              </Button>
            </Link>

            <Separator />

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[4].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[4].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <Heart className="" />
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[5].path}`}
            >
              <Button
                variant={
                  pathArr.includes(linksData[5].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <History className="" />
              </Button>
            </Link>

            <Link
              onClick={handleClick}
              className="w-full"
              href={`/${linksData[6].path}/${userId}`}
            >
              <Button
                variant={
                  router.pathname === "/posts/[id]" ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <User className="" />
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
