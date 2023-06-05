import { TNickname } from "./auth";
import { TComment } from "./comments";
import {
  TContent,
  TPostId,
  TPostImage,
  TThumbnailImage,
  TTitle,
  TViews,
  TcreateDate,
} from "./posts";

// 자유게시판 데이터
export interface IFreePost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnailImage: TThumbnailImage;
  views: TViews;
  commentsCount: TComment[];
}

export interface IFreePostsPerPage {
  data: IFreePost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface IFreePostDetail {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  postImage: TPostImage;
  views: TViews;
  comments: TComment[];
  userPK: string;
}

export interface IFreePostDataArr {
  data: IFreePost[];
}

//게시글 업로드 폼
export interface IPostForm {
  title: TTitle;
  content: TContent;
}
//게시글 업데이트 폼
export interface IUpdatePostForm {
  postId: TPostId; // url에 포함
  title: TTitle;
  content: TContent;
}

// 게시글 삭제 시 전송할 데이터
export interface IDeletePost {
  postId: TPostId; // url에 포함
}
