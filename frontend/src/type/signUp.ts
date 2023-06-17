import * as z from "zod";

import {
  TEmail,
  TIsDancer,
  TNickname,
  TPassword,
  TPhone,
  TUserId,
} from "./auth";

// 회원가입 시 요청 데이터
export interface ISignUpForm {
  userId: TUserId;
  nickname: TNickname;
  email: TEmail;
  phone: TPhone;
  password: TPassword;
  passwordCheck: TPassword;
  isDancer: TIsDancer;

  extraError?: string;
}

export const signUpFormSchema = z
  .object({
    userId: z
      .string({
        required_error: "로그인을 위한 아이디를 입력해주세요.",
      })
      .min(2, {
        message: "아이디는 최초 2자리 이상입니다.",
      })
      .max(20, {
        message: "아이디는 최대 20자리 이하입니다.",
      })
      .regex(
        /^[a-z0-9]{4,30}$/,
        "영문 소문자 또는 영문+숫자 조합 2~20자리를 입력해주세요."
      ),
    nickname: z
      .string({
        required_error: "다른 사람들에게 보일 닉네임을 입력해주세요.",
      })
      .min(2, {
        message: "닉네임은 최초 2자리 이상입니다.",
      })
      .max(10, {
        message: "닉네임은 최대 10자리 이하입니다.",
      }),
    phone: z
      .string({
        required_error: "전화번호를 입력해주세요.",
      })
      .min(9, {
        message: "전화번호는 최소 9자리 이상입니다.",
      })
      .max(11, {
        message: "전화번호는 최대 11자리 이하입니다.",
      })
      .refine((value) => value.replace(/[^0-9]/g, ""), {
        message: "전화번호는 숫자만 입력해주세요.",
      }),
    email: z
      .string({
        required_error: "이메일을 입력해주세요.",
      })
      .email("이메일 형식으로 입력해주세요."),
    password: z
      .string({
        required_error: "비밀번호를 입력해주세요.",
      })
      .max(20, {
        message: "비밀번호는 최대 20자리 이하입니다.",
      })
      .min(4, {
        message: "비밀번호는 최소 4자리 이상입니다.",
      }),
    passwordCheck: z.string({
      required_error: "비밀번호 확인을 입력해주세요.",
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export type SignUpFormProps = React.HTMLAttributes<HTMLDivElement>;
