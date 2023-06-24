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

//! 댄서게시판의 1개 게시글 (확정)
export interface IDancerPost {
  postId: TPostId;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnail: TThumbnail;
  video: TVideo;
  views: TViews;
  commentsCount: TCommentCount;
  likesCount: TLikesCount;
  feedbackPrice: TFeedbackPrice;
}
//! 댄서게시판의 무한스크롤 데이터 (확정)
export interface IDancerPostsPerPage {
  data: IDancerPost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

//! 댄서게시글 상세 페이지 데이터 (확정)
export interface IDancerPostDetail {
  postId: TPostId;
  title: TTitle;
  userId: string;
  userLike: boolean;
  nickname: TNickname;
  content: TContent;
  createDate: TcreateDate;
  thumbnail: TThumbnail;
  video: TVideo;
  views: TViews;
  likesCount: TLikesCount;
  feedbackPrice: TFeedbackPrice;
  comments: IComment[];
}

export interface IDancerPostDataArr {
  data: IDancerPost[];
}

export interface ICreateDancerPostData {
  formData: FormData; // { title: string, content: string, video: File, feedbackPrice: number, startTime: string, endTime: string }
}

export interface IUpdateDancerPostData {
  postId: TPostId;
  formData: FormData; // { title: string, content: string, video: File, feedbackPrice: number, startTime: string, endTime: string }
}

export type TFeedbackPrice = number;
