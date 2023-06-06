import { User } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <Link href="/signin">
      <User />
    </Link>
  );
}
