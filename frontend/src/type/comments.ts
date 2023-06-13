import { TNickname, TUserId } from "./auth";
import { TPostId } from "./posts";

// 댓글 데이터
export interface TComment {
  commentId: TCommentId;
  userId: TUserId;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  postId: TPostId;
}

// 댓글 생성 폼 타입
export interface ICreateCommentForm {
  content: TContent;
}
// 댓글 생성 유니온 타입
export interface ICreateComment extends ICreateCommentForm {
  content: TContent;
}
// 댓글 수정 폼 타입
export interface IUpdateCommentForm {
  content: TContent;
}
// 댓글 수정 유니온 타입
export interface IUpdateComment extends IUpdateCommentForm {
  commentId: TCommentId;
  postId: TPostId;
}
// 댓글 삭제 타입
export interface IDeleteComment {
  commentId: TCommentId;
  postId: TPostId;
}

export type TCommentId = string;
export type TContent = string;
export type TCreateDate = string;
export type TCommentCount = number;
