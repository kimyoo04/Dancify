import Link from "next/link";

import { cn } from "@lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "mx-6 mt-1 flex items-center space-x-4 lg:space-x-6",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        href="/posts"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        posts
      </Link>
    </nav>
  );
}
