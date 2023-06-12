import Link from "next/link";
import UserSignInForm from "./UserSignInForm";

export default function SignIn() {
  return (
    <div className="container relative grid h-[800px] flex-col items-center justify-center ">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Dancify 로그인
            </h1>
            <p className="text-sm text-muted-foreground">
              아이디와 비밀번호를 입력해주세요
            </p>
          </div>

          {/* 로그인 폼 */}
          <UserSignInForm />

          {/* 정책 설명 */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            로그인으로 당사는{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              개인정보 활용방침
            </Link>{" "}
            에 대해 동의하는 것으로 간주합니다.{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              자세한 사항
            </Link>
            을 참고해 주시기 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
}
