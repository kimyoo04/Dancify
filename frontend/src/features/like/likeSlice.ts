import { createSlice } from "@reduxjs/toolkit";
import { ILikeState } from "@type/like";

const initialState: ILikeState = {
  userLike: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    toggleLike: (state) => {
      state.userLike = !state.userLike;
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice.reducer;
