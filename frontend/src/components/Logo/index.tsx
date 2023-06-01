import Link from "next/link";
import ButtonWrapper from "@components/Animation/ButtonWrapper";

export default function Logo() {
  return (
    <Link href={"/"}>
      <ButtonWrapper>
        <span className="pb-[6px] pl-[4px] text-2xl font-bold text-main_color_yellow dark:text-main_color_yellow">
          수어 번역 서비스
        </span>
      </ButtonWrapper>
    </Link>
  );
}
