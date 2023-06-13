import { TNickname, TUserId } from "./auth";
import { TComment, TCommentCount } from "./comments";
import { TLikesCount } from "./like";
import {
  TPostId,
  TTitle,
  TContent,
  TPostImage,
  TViews,
  TcreateDate,
} from "./posts";

//! 자유게시판의 1개 게시글 (확정)
export interface IFreePost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  postImage: TPostImage;
  views: TViews;
  commentsCount: TCommentCount;
  likesCount: TLikesCount;
}

//! 자유게시판의 무한스크롤 데이터 (확정)
export interface IFreePostsPerPage {
  data: IFreePost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

//! 자유게시글 상세페이지 데이터 (확정)
export interface IFreePostDetail {
  postId: TPostId;
  title: TTitle;
  userId: TUserId;
  userLike: boolean; // 미완
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  postImage: TPostImage;
  views: TViews;
  likesCount: TLikesCount;
  comments: TComment[];
}

export interface IFreePostDataArr {
  data: IFreePost[];
}

//! 자유게시글 업로드 폼 (확정)
export interface ICreatPostForm {
  title: TTitle;
  content: TContent;
  postImage?: TPostImage;
}

//! 자유게시글 업데이트 폼 (확정)
export interface IUpdatePostForm {
  postId: TPostId; // url에 포함
  title: TTitle;
  content: TContent;
  postImage: TPostImage;
}

//! 자유게시글 삭제 시 전송할 데이터 (확정)
export interface IDeletePost {
  postId: TPostId; // url에 포함
}
