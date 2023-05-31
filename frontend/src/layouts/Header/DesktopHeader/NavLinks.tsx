import { useRouter } from "next/router";
import Link from "next/link";
import ButtonWrapper from "@components/Animation/ButtonWrapper";

export default function NavLinks() {
  const router = useRouter();
  const pathsArr = router.asPath.split("/");
  const hilightedText = (path: string) =>
    pathsArr.includes(path) ? "font-bold text-main_color" : "";

  return (
    <div className="flex gap-3 text-xl font-medium">
      {/* 링크들 */}
      <Link href={"/chat"} className="">
        <ButtonWrapper>
          <span
            className={`text-lg ${hilightedText("chat")}
            }`}
          >
            챗봇 대화
          </span>
        </ButtonWrapper>
      </Link>
      <Link href={"/signLanguage"} className="">
        <ButtonWrapper>
          <span className={`text-lg ${hilightedText("signLanguage")}`}>
            수어 번역
          </span>
        </ButtonWrapper>
      </Link>
      <Link href={"/posts"} className="">
        <ButtonWrapper>
          <span className={`text-lg ${hilightedText("posts")}`}>
            자유게시판
          </span>
        </ButtonWrapper>
      </Link>
    </div>
  );
}
