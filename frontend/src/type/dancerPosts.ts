import { TNickname, TProfileImg, TUserId } from "./auth";
import { TCommentCount, IComment } from "./comments";
import { TGenreValue } from "./filter";
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

// 댄서게시판의 1개 게시글
export interface IDancerPost {
  postId: TPostId;
  genre: TGenreValue;
  title: TTitle;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  thumbnail: TThumbnail;
  profileImage: TProfileImg;
  video: TVideo;
  views: TViews;
  commentsCount: TCommentCount;
  likesCount: TLikesCount;
  feedbackPrice: TFeedbackPrice;
}

// 댄서게시판의 무한스크롤 데이터
export interface IDancerPostsPerPage {
  data: IDancerPost[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

// 댄서게시글 상세 페이지 데이터
export interface IDancerPostDetail {
  postId: TPostId;
  genre: TGenreValue;
  title: TTitle;
  userId: string;
  userLike: boolean;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  thumbnail: TThumbnail;
  profileImage: TProfileImg;
  video: TVideo;
  views: TViews;
  likesCount: TLikesCount;
  feedbackPrice: TFeedbackPrice;
  comments: IComment[];
}

// 댄서게시판의 1개 게시글
export interface IHistory {
  videoHistoryId: string;
  viewDate: string;
  dancerPost: IDancerHistoryPost
}

export interface IDancerHistoryPost {
  postId: TPostId;
  title: TTitle;
  userId: TUserId;
  nickname: TNickname;
  content: TContent;
  createDate: TCreateDate;
  thumbnail: TThumbnail;
  profileImage: TProfileImg;
  video: TVideo;
  views: TViews;
  feedbackPrice: TFeedbackPrice;
};

// 댄서게시판의 무한스크롤 데이터
export interface IHistoriesPerPage {
  data: IHistory[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export interface IDancerPostDataArr {
  data: IDancerPost[];
}

export interface ICreateDancerPostSectionData {
  postId: TPostId;
  videoExtension: string;
  timeStamps: string;
}

export interface IUpdateDancerPostData {
  postId: TPostId;
  formData: FormData; // { title: string, content: string, video: File, feedbackPrice: number, startTime: string, endTime: string }
}

export type TFeedbackPrice = number;
