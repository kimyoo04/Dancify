export type userPayload = {
  id?: string;
  username?: string;
  email?: string;
};

export interface AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: userPayload;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
}

// 프로필 정보 수정
export interface IProfileInfoForm {
  userPk: TUserPk;
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
