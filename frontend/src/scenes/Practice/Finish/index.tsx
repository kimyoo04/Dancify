import { Button } from "@components/ui/button";
import Link from "next/link";

export default function Finish() {
  return (
    <div>
      <h1>Finish</h1>
      <Link href="/feedbacks" replace={true}>
        <Button>피드백 페이지로 이동</Button>
      </Link>
      <Link href="/" replace={true}>
        <Button>아니요</Button>
      </Link>
    </div>
  );
}
