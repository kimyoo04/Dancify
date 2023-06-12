import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilterAction, IFilterState } from "@type/filter";

const initialState: IFilterState = {
  sort: "",
  genre: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // 최근 검색어 1개 제거
    getFilter: (state, actions: PayloadAction<IFilterAction>) => {
      state.sort = actions.payload.sort || "";
      state.genre = actions.payload.genre || "";
    },
    resetFilter: (state) => {
      state.sort = "";
      state.genre = "";
    },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
