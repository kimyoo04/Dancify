import { TNickname } from "./auth";
import { TCommentCount, IComment } from "./comments";
import { TLikesCount } from "./like";
import {
  TContent,
  TPostId,
  TThumbnail,
  TTitle,
  TVideo,
  TViews,
  TcreateDate,
} from "./posts";

//! 자랑게시판의 1개 게시글 (확정)
export interface IVideoPost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnail: TThumbnail;
  video: TVideo;
  views: TViews;
  likesCount: TLikesCount;
  commentsCount: TCommentCount;
}

//! 자랑게시판의 무한스크롤 데이터 (확정)
export interface IVideoPostsPerPage {
  data: IVideoPost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

//! 자랑게시글 상세 페이지 데이터 (확정)
export interface IVideoPostDetail {
  postId: TPostId;
  title: TTitle;
  userId: string;
  userLike: boolean; // 미완
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnail: TThumbnail;
  video: TVideo;
  views: TViews;
  likesCount: TLikesCount;
  comments: IComment[];
}

export interface IVideoPostDataArr {
  data: IVideoPost[];
}

//게시글 업로드 폼
export interface ICreatPostForm {
  title: TTitle;
  content: TContent;
  thumbnail: TThumbnail;
  video: string;
}
//게시글 업데이트 폼
export interface IUpdatePostForm {
  title: TTitle;
  content: TContent;
  video: string;
}
export interface IUpdatePost {
  postId: TPostId; // url에 포함
  title: TTitle;
  content: TContent;
  video: string;
}

// 게시글 삭제 시 전송할 데이터
export interface IDeletePost {
  postId: TPostId; // url에 포함
}
