import Link from "next/link";

interface props {
  href: string;
}

export default function ViewMore({ href }: props) {
  return (
    <Link href={href}>
      <span
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-muted px-3 py-1.5 text-sm font-medium ring-offset-background`}
      >
        더보기
      </span>
    </Link>
  );
}
