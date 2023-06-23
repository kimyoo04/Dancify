import { Button } from "@components/ui/button";
import { TPostId } from "@type/posts";
import Link from "next/link";

export default function StartPracticeButton({ postId }: { postId: TPostId }) {
  return (
    <Link href={`/practice/${postId}`} replace={true}>
      <Button className="w-full">안무 연습 시작</Button>
    </Link>
  );
}
