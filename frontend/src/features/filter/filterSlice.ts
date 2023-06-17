import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilterState, TGenre, TSort } from "@type/filter";

const initialState: IFilterState = {
  sort: "new",
  genre: "전체",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // 정렬 변경
    getSort: (state, actions: PayloadAction<TSort>) => {
      state.sort = actions.payload;
    },
    // 장르 변경
    getGenre: (state, actions: PayloadAction<TGenre>) => {
      state.genre = actions.payload;
    },
    // 필터 초기화
    resetFilter: (state) => {
      state.sort = "new";
      state.genre = "전체";
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
