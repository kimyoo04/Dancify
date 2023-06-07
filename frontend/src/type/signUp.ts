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
