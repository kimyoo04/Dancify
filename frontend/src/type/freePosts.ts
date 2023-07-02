import { TNickname, TProfileImg, TUserId } from "./auth";
import { IComment, TCommentCount } from "./comments";
import { TLikesCount } from "./like";
import {
  TPostId,
  TTitle,
  TContent,
  TPostImage,
  TViews,
  TCreateDate,
} from "./posts";

//! 자유게시판의 1개 게시글 (확정)
export interface IFreePost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  profileImage: TProfileImg;
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
  profileImage: TProfileImg;
  postImage: TPostImage;
  createDate: TCreateDate;
  views: TViews;
  likesCount: TLikesCount;
  comments: IComment[];
}

export interface IFreePostDataArr {
  data: IFreePost[];
}

export interface ICreateFreePostData {
  formData: FormData; // { title: string, content: string, postImage: File}
}

export interface IUpdateFreePostData {
  postId: TPostId;
  formData: FormData; // { title: string, content: string, postImage: File}
}
