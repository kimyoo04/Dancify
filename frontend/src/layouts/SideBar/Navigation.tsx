import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { linksData } from "./linksData";
import { useAppSelector } from "@toolkit/hook";
import {
  LayoutGrid,
  ListMusic,
  Music2,
  PlayCircle,
  Radio,
  User,
} from "lucide-react";

export default function Navigation({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const isActive = router.pathname.split("/");
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);

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
            <Link className="w-full" href={`/${linksData[0].path}`}>
              <Button
                variant={router.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <PlayCircle className="mr-6" />
                {linksData[0].name}
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[1].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[1].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <LayoutGrid className="mr-6" />
                {linksData[1].name}
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[2].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[2].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <Radio className="mr-6" />
                {linksData[2].name}
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[3].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[3].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <ListMusic className="mr-6" />
                {linksData[3].name}
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[4].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[4].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <Music2 className="mr-6" />
                {linksData[4].name}
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[5].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[5].path) ? "default" : "ghost"
                }
                size="sm"
                className="h-10 w-full items-center justify-start pl-2"
              >
                <User className="mr-6" />
                {linksData[5].name}
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
          <div className="col-center w-[72px] gap-2">
            <Link className="w-full" href={`/${linksData[0].path}`}>
              <Button
                variant={router.pathname === "/" ? "default" : "ghost"}
                size="sm"
                className="col-center h-10 w-10"
              >
                <PlayCircle className="" />
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[1].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[1].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <LayoutGrid className="" />
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[2].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[2].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <Radio className="" />
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[3].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[3].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <ListMusic className="" />
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[4].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[4].path) ? "default" : "ghost"
                }
                size="sm"
                className="col-center h-10 w-10"
              >
                <Music2 className="" />
              </Button>
            </Link>

            <Link className="w-full" href={`/${linksData[5].path}`}>
              <Button
                variant={
                  isActive.includes(linksData[5].path) ? "default" : "ghost"
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
