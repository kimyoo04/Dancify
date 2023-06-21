import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="sr-only">Dancify</h1>
      <h1 className="logo mb-1 text-[22px]">▶ancify</h1>
    </Link>
  );
}
