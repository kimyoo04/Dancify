import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <h1 className="undraggable text-2xl font-bold">Dancify</h1>
    </Link>
  );
}
