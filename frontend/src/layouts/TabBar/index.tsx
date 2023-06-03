import { Book, Heart, Home, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

export default function TabBar() {
  return (
    <div className="container fixed bottom-0 flex h-16 w-screen items-center justify-between border-t md:hidden">
      <Link href="/home" className="col-center">
        <Home />
        <span className="text-sm">Home</span>
      </Link>
      <Link href="/posts" className="col-center">
        <Book />
        <span className="text-sm">Posts</span>
      </Link>
      <Link href="/likes" className="col-center">
        <Heart />
        <span className="text-sm">Likes</span>
      </Link>
      <Link href="/storage" className="col-center">
        <ShoppingBagIcon />
        <span className="text-sm">Storage</span>
      </Link>
    </div>
  );
}
