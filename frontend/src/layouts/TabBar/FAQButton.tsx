import Link from "next/link";
import { useRouter } from "next/router";

export default function FAQButton() {
  const router = useRouter()

  return (
    <Link href="/faq" className={router.asPath === "/" ? "" : "hidden"}>
      <button
        className={`col-center dark:shadow-gray-4 group fixed bottom-20 right-4 z-10 h-8 w-8 rounded-full bg-muted shadow-sm shadow-gray_1 transition-all hover:scale-110 md:bottom-4 font-bold`}
      >
        ?
      </button>
    </Link>
  );
}
