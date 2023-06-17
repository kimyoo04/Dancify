import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMore: false,
  isUpdate: false,
  isDelete: false,
  commentId: "",
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // 더보기 버튼 클릭했을 때
    toggleMore: (state, action: PayloadAction<string>) => {
      state.isMore = !state.isMore;
      state.commentId = action.payload;
    },

    // 수정 버튼 클릭했을 때
    clickUpdate: (state, action: PayloadAction<string>) => {
      state.isUpdate = true;
      state.commentId = action.payload;
    },

    // 삭제 버튼 클릭했을 때
    clickDelete: (state, action: PayloadAction<string>) => {
      state.isDelete = true;
      state.commentId = action.payload;
    },

    // 수정이나 삭제를 완료했을 때
    resetComment: (state) => {
      state.isMore = false;
      state.isDelete = false;
      state.isUpdate = false;
      state.commentId = "";
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice.reducer;
