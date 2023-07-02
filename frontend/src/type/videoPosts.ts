import { TNickname, TProfileImg } from "./auth";
import { TCommentCount, IComment } from "./comments";
import { TLikesCount } from "./like";
import {
  TContent,
  TPostId,
  TThumbnail,
  TTitle,
  TVideo,
  TViews,
  TCreateDate,
} from "./posts";

//! 자랑게시판의 1개 게시글 (확정)
export interface IVideoPost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  thumbnail: TThumbnail;
  profileImage: TProfileImg;
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
  createDate: TCreateDate;
  thumbnail: TThumbnail;
  profileImage: TProfileImg;
  video: TVideo;
  views: TViews;
  likesCount: TLikesCount;
  comments: IComment[];
}

export interface IVideoPostDataArr {
  data: IVideoPost[];
}

export interface ICreateVideoPostData {
  formData: FormData; // { title: string, content: string, video: File}
}

export interface IUpdateVideoPostData {
  postId: TPostId;
  formData: FormData; // { title: string, content: string, video: File}
}
