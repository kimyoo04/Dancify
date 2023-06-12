import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ILikeState, ILikeAction } from "@type/like";

const initialState: ILikeState = {
  userLike: false,
  postId: "",
  postCategory: "",
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    // 최근 검색어 1개 제거
    getDetailPost: (state, actions: PayloadAction<ILikeAction>) => {
      state.userLike = actions.payload.userLike;
      state.postId = actions.payload.postId;
      state.postCategory = actions.payload.postCategory;
    },

    // TODO 비동기 처리 고려하기
    toggleLike: (state) => {
      state.userLike = !state.userLike;
    },

    resetDetailPost: (state) => {
      state.userLike = false;
      state.postId = "";
      state.postCategory = "";
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice.reducer;
