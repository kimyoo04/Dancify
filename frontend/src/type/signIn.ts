import { TPassword, TUserId } from "./auth";
import * as z from "zod";

// 로그인 시 요청 데이터
export interface ISignInForm {
  userId: TUserId;
  password: TPassword;

  extraError?: string;
}

export const signInFormSchema = z.object({
  userId: z
    .string({
      required_error: "아이디를 입력해주세요.",
    })
    .min(2, {
      message: "아이디는 최소 2글자 이상입니다.",
    })
    .max(20, {
      message: "아이디는 최대 20글자 이하입니다.",
    }),
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
    })
    .max(20, {
      message: "비밀번호는 최대 20글자 이하입니다.",
    })
    .min(4, {
      message: "비밀번호는 최소 4글자 이상입니다.",
    }),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export type SignInFormProps = React.HTMLAttributes<HTMLDivElement>;
