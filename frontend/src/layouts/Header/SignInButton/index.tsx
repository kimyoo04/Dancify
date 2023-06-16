import { Button } from "@components/ui/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href={"/signin"}>
      <Button variant={"default"}>Sign In</Button>
    </Link>
  );
}
