import { Book, Heart, Home, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function TabBar() {
  return (
    <div className="container fixed bottom-0 grid h-16 w-screen grid-cols-4 justify-between border-t md:hidden">
      <Link href="/" className="col-center">
        <Home />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/posts" className="col-center">
        <Book />
        <span className="text-xs">Posts</span>
      </Link>
      <Link href="/likes" className="col-center">
        <Heart />
        <span className="text-xs">Likes</span>
      </Link>
      <Link href="/storage" className="col-center">
        <ShoppingBagIcon />
        <span className="text-xs">Storage</span>
      </Link>
    </div>
  );
}
