// redux-toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { IPostEditorState, IPostInfo } from "@type/postEditor";
import { TContent, TTitle } from "@type/posts";

const initialState: IPostEditorState = {
  postId: "",
  postTitle: "",
  postContent: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostInfo: (state, actions: PayloadAction<IPostInfo>) => {
      state.postId = actions.payload.postId;
      state.postTitle = actions.payload.postTitle;
      state.postContent = actions.payload.postContent;
    },
    writingTitle: (state, action: PayloadAction<TTitle>) => {
      state.postTitle = action.payload;
    },
    writingContent: (state, action: PayloadAction<TContent>) => {
      state.postContent = action.payload;
    },
    finishWriting: (state) => {
      state.postId = "";
      state.postTitle = "";
      state.postContent = "";
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
