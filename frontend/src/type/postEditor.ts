import { TContent, TPostId, TTitle } from "./posts";

export interface IPostEditorState {
  postId: TPostId;
  postTitle: TContent;
  postContent: TContent;
}

export interface IPostInfo {
  postId: TPostId;
  postTitle: TContent;
  postContent: TContent;
}

export interface IPostTitleForm {
  title: TTitle;
}
