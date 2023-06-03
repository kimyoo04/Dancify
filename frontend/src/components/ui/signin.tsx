import { User } from "lucide-react";
import Link from "next/link";

export default function Signin() {
  return (
    <Link href="/signin">
      <User />
    </Link>
  );
}
