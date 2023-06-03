import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Search() {
  return (
    <Link href="/search">
      <SearchIcon className="h-6 w-6 cursor-pointer" />
    </Link>
  );
}
