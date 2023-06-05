import { TNickname } from "./auth";
import { TComment } from "./comments";
import {
  TContent,
  TPostId,
  TThumbnailImage,
  TTitle,
  TVideoUrl,
  TViews,
  TcreateDate,
} from "./posts";

export interface IVideoPost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnailImage: TThumbnailImage;
  videoUrl: TVideoUrl;
  views: TViews;
  commentsCount: TComment[];
}

export interface IVideoPostsPerPage {
  data: IVideoPost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

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
