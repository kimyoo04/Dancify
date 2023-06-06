import { TPostId } from "./posts";

export interface ILike {
  postId: TPostId;
  postCategory: "free" | "video" | "dancer";
}
