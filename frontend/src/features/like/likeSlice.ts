import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserLike } from "@type/auth";
import { ILikeState } from "@type/like";

const initialState: ILikeState = {
  userLike: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    toggleUserLike: (state) => {
      state.userLike = !state.userLike;
    },
    getUserLike: (state, actions: PayloadAction<TUserLike>) => {
      state.userLike = actions.payload;
    },
  },
});

export const likeActions = likeSlice.actions;
export default likeSlice.reducer;
