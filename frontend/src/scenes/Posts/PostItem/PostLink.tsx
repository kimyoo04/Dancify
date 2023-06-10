import Link from "next/link";
import { useRouter } from "next/router";

interface props {
  href: string;
  text: string;
}

export default function PostLink({ href, text }: props) {
  const router = useRouter();

  return (
    <Link href={href}>
      <span
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all ${
          router.pathname === href ? "bg-background text-foreground" : ""
        }`}
      >
        {text}
      </span>
    </Link>
  );
}
