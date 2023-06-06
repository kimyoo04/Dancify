import { TNickname } from "./auth";
import { TComment } from "./comments";
import {
  TCommentCount,
  TContent,
  TPostId,
  TThumbnailImage,
  TTitle,
  TVideoUrl,
  TViews,
  TcreateDate,
} from "./posts";

// 자랑게시판의 1개 게시글
export interface IVideoPost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnailImage: TThumbnailImage;
  videoUrl: TVideoUrl;
  views: TViews;
  commentsCount: TCommentCount;
}

// 자랑게시판의 무한스크롤 데이터
export interface IVideoPostsPerPage {
  data: IVideoPost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// 자랑게시글 1개 데이터
export interface IVideoPostDetail {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  videoUrl: TVideoUrl;
  views: TViews;
  comments: TComment[];
  userPK: string;
}

export interface IVideoPostDataArr {
  data: IVideoPost[];
}

//게시글 업로드 폼
export interface IPostForm {
  title: TTitle;
  content: TContent;
  videoUrl: string;
}
//게시글 업데이트 폼
export interface IUpdatePostForm {
  postId: TPostId; // url에 포함
  title: TTitle;
  content: TContent;
  videoUrl: string;
}

// 게시글 삭제 시 전송할 데이터
export interface IDeletePost {
  postId: TPostId; // url에 포함
}
