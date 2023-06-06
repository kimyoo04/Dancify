import { TPassword, TUserId } from "./auth";

// 로그인 시 요청 데이터
export interface ISignInForm {
  userId: TUserId;
  password: TPassword;

  extraError?: string;
}
