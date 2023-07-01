import { TContent, TPostId, TTitle } from "./posts";

export interface IPostEditorState {
  step: number;
  isAgree: boolean;
  isMosaic: boolean;
  genre: string;
  postId: string;
  postTitle: string;
  postContent: string;
  postImage: string;
  postVideo: string;
  feedbackPrice: number;
  timeStamps: ITimeStamp[];
}

export interface IFreePostInfo {
  postId: TPostId;
  postTitle: TContent;
  postContent: TContent;
  postImage: TContent;
}

export interface IVideoPostInfo {
  postId: TPostId;
  postTitle: TContent;
  postContent: TContent;
  postVideo: string;
}

export interface IDancerPostInfo {
  postId: TPostId;
  genre: string;
  postTitle: TContent;
  postContent: TContent;
  postVideo: string;
  feedbackPrice: number;
}

export interface IPostTitleForm {
  title: TTitle;
}

export interface ITimeStamp {
  time: number;
  ratio: number;
}
