import { TNickname, TUserId } from "./auth";
import { TPostId } from "./posts";

// 댓글 데이터
export interface TComment {
  id: TCommentId;
  userId: TUserId;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  postId: TPostId;
}
// 댓글 폼 데이터
export interface ICreateCommentForm {
  content: TContent;
}
// 댓글 PATCH 요청 유니온 타입
export interface IPatchComment extends IPatchCommentForm {
  postId: TPostId;
}
// 댓글 PATCH 요청 폼 타입
export interface IPatchCommentForm {
  content: TContent;
}

export type TCommentId = string;
export type TContent = string;
export type TCreateDate = string;
