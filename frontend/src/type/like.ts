import { TPostId } from "./posts";

export interface ILikeState {
  userLike: boolean;
}

export interface ILikeAction {
  userLike: boolean;
  postId: TPostId;
  postCategory: TPostCategoryUpper;
}

export interface ILikeToggle {
  postId: TPostId;
  postCategory: TPostCategoryUpper;
}

export type TLikesCount = number;
export type TPostCategoryUpper = "FREE" | "VIDEO" | "DANCER" | "";
export type TPostCategoryLower = "free" | "video" | "dancer" | "";
