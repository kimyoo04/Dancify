export interface IDecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  userId: string;
  nickname: string;
  isDancer: boolean | undefined;
  profileImage: string | null;
}

export interface userPayload {
  userId: string;
  nickname: string;
  isDancer: boolean | undefined;
  profileImage: string | null;
}

// authSlice에 사용
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: string;
  nickname: string;
  isDancer: boolean | undefined;
  profileImage: string | null;
}

// 프로필 정보 수정
export interface IProfileInfoForm {
  userId: TUserId;
  nickname: TNickname;
  email: TEmail;
  description: TDescription;
}

// 프로필 이미지 업로드
export interface IProfileImageForm {
  profileImage: TProfileImg;
}

export type TUserPk = string;
export type TUserId = string;
export type TNickname = string;
export type TEmail = string;
export type TPhone = string;
export type TDescription = string;
export type TPassword = string;
export type TIsDancer = boolean;
export type TProfileImg = string;
