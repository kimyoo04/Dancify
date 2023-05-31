export interface ISignInForm {
  userId: TUserId;
  username: TUsername;
  password: string;
  extraError?: string;
}

export type TUserId = string;
export type TUsername = string;
export type TEmail = string;
export type TPassword = string;
