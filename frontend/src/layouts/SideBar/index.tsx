import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { useRouter } from "next/router";
import Link from "next/link";
import { linksData } from "./linksData";

export default function SideBar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const router = useRouter();
  const isActive = router.pathname.split("/");

  return (
    <div className={cn(className)}>
      <div className="space-y-5">
        <Link href={`/${linksData[0].path}`}>
          <Button
            variant={router.pathname === "/" ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
          >
            {linksData[0].icon}
            {linksData[0].name}
          </Button>
        </Link>

        <Link href={`/${linksData[1].path}`}>
          <Button
            variant={isActive.includes(linksData[1].path) ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
          >
            {linksData[1].icon}
            {linksData[1].name}
          </Button>
        </Link>

        <Link href={`/${linksData[2].path}`}>
          <Button
            variant={isActive.includes(linksData[2].path) ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
          >
            {linksData[2].icon}
            {linksData[2].name}
          </Button>
        </Link>

        <Link href={`/${linksData[3].path}`}>
          <Button
            variant={isActive.includes(linksData[3].path) ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
          >
            {linksData[3].icon}
            {linksData[3].name}
          </Button>
        </Link>

        <Link href={`/${linksData[4].path}`}>
          <Button
            variant={isActive.includes(linksData[4].path) ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
          >
            {linksData[4].icon}
            {linksData[4].name}
          </Button>
        </Link>

        <Link href={`/${linksData[5].path}`}>
          <Button
            variant={isActive.includes(linksData[5].path) ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start"
          >
            {linksData[5].icon}
            {linksData[5].name}
          </Button>
        </Link>
      </div>
    </div>
  );
}
