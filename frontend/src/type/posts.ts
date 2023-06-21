import { TGenre, TSort } from "./filter";
import { TSearchKeyword } from "./search";

export type TPostId = string;
export type TTitle = string;
export type TContent = string;
export type TViews = number;
export type TcreateDate = string;
export type TPostImage = string | null;
export type TVideo = string;
export type TThumbnail = string;

export interface IPostQueryParams {
  page: number;
  q?: TSearchKeyword;
  sort?: TSort;
  genre?: TGenre;
}

export interface IUpdatePost {
  postId: TPostId; // url에 포함
  formData: FormData;
}