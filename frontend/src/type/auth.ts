import * as z from "zod";
export interface IDecodedToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  userId: TUserId;
  nickname: TNickname;
  isDancer: TIsDancer | undefined;
  profileImage: TProfileImg | null;
}

export interface userPayload {
  userId: TUserId;
  nickname: TNickname;
  isDancer: TIsDancer | undefined;
  profileImage: TProfileImg | null;
}

// authSlice에 사용
export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: TUserId;
  nickname: TNickname;
  isDancer: TIsDancer | undefined;
  profileImage: TProfileImg | null;
}

// 프로필 정보 수정
export interface IProfileInfoForm {
  userId: TUserId;
  nickname: TNickname;
  email: TEmail;
  description?: TDescription;
  profileImage?: TProfileImg | null;
}
export interface IProfileDefaultValue {
  nickname: TNickname;
  email: TEmail;
  description?: TDescription;
  profileImage?: TProfileImg | null;
}

// 프로필 이미지 업로드
export interface IProfileImageForm {
  profileImage: TProfileImg;
}

export type TUserId = string;
export type TUserPK = string;
export type TUserLike = boolean;
export type TNickname = string;
export type TEmail = string;
export type TPhone = string;
export type TDescription = string;
export type TPassword = string;
export type TIsDancer = boolean;
export type TProfileImg = string;

export interface IProfile {
  userId: TUserId;
  nickname: TNickname;
  email: TEmail;
  isDancer: TIsDancer;
  profileImage: TProfileImg | null;
  description: TDescription;
  phone: TPhone;
}

export const profileFormSchema = z.object({
  profileImage: z.custom<File>((v) => v instanceof File).optional(),
  nickname: z
    .string({
      required_error: "다른 사람들에게 보일 닉네임을 입력해주세요.",
    })
    .min(2, {
      message: "닉네임은 최초 2글자 이상입니다.",
    })
    .max(10, {
      message: "닉네임은 최대 10글자 이하입니다.",
    }),
  email: z
    .string({
      required_error: "이메일을 입력해주세요.",
    })
    .email("이메일 형식으로 입력해주세요."),
  description: z
    .string()
    .max(200, {
      message: "설명글은 최대 200글자 이상입니다.",
    })
    .min(4, {
      message: "설명글은 최소 4글자 이상입니다.",
    })
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
