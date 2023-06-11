import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href={"/signin"}>
      <button className="rounded-full bg-primary px-3 py-1 text-white">
        Sign In
      </button>
    </Link>
  );
}
