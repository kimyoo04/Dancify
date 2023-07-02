import { TNickname, TProfileImg, TUserId } from "./auth";
import { TPostId } from "./posts";
import * as z from "zod";

// 댓글 데이터
export interface IComment {
  commentId: TCommentId;
  userId: TUserId;
  profileImage: TProfileImg;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  postId: TPostId;
}

// 댓글 생성 폼 타입
export interface ICreateCommentForm {
  content: TContent;
}
export interface ICreateComment {
  postId: TPostId; // useRouter를 통한 UUID 얻기
  content: TContent;
}
// 댓글 수정 폼 타입
export interface IUpdateCommentForm {
  content: TContent;
}
// 댓글 수정 유니온 타입
export interface IUpdateComment extends IUpdateCommentForm {
  commentId: TCommentId;
}
// 댓글 삭제 타입
export interface IDeleteComment {
  commentId: TCommentId;
}

export type TCommentId = string;
export type TContent = string;
export type TCreateDate = string;
export type TCommentCount = number;

export const commentFormSchema = z.object({
  content: z
    .string({
      required_error: "내용을 입력해 주세요.",
    })
    .min(3, {
      message: "최소 세 글자 이상 입력해 주세요.",
    })
    .max(300, {
      message: "최대 300 글자까지 입력할 수 있어요.",
    }),
});
export type CommentFormValues = z.infer<typeof commentFormSchema>;
