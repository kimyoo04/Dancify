import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IKeywordIndex,
  ISearchCategory,
  ISearchKeyword,
  ISearchState,
} from "@type/search";

const initialState: ISearchState = {
  isOpen: false,
  isFocus: false,
  searchCategory: "DANCER",
  searchKeyword: "",
  keywords: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // input focus 설정
    onFocus: (state) => {
      state.isFocus = true;
    },
    // input focus 해제
    onBlur: (state) => {
      state.isFocus = false;
    },

    openOverlay: (state) => {
      state.isOpen = true;
    },
    closeOverlay: (state) => {
      state.isOpen = false;
    },

    // 카테고리 선택 및 해당 최근 검색어 전체 조회
    getAllKeywords: (state) => {
      state.keywords = JSON.parse(
        localStorage.getItem(state.searchCategory) || "[]"
      );
    },

    // 카테고리 선택 및 해당 최근 검색어 전체 조회
    chooseCategory: (state, actions: PayloadAction<ISearchCategory>) => {
      state.searchCategory = actions.payload.searchCategory;
      state.keywords = JSON.parse(
        localStorage.getItem(state.searchCategory) || "[]"
      );
    },

    // searchKeyword으로 axiso GET 요청 및 최근 검색어 1개 추가
    searchKeyword: (state, actions: PayloadAction<ISearchKeyword>) => {
      state.searchKeyword = actions.payload.searchKeyword;
      state.isOpen = false;

      const keywords = JSON.parse(
        localStorage.getItem(state.searchCategory) || "[]"
      );
      const searchKeyword = state.searchKeyword;

      //  중복 제외
      if (!keywords.includes(searchKeyword)) {
        state.keywords = [state.searchKeyword, ...state.keywords];

        // 15개 저장 제한
        if (state.keywords.length > 15) {
          state.keywords.splice(15, state.keywords.length - 15);
        }

        localStorage.setItem(
          state.searchCategory,
          JSON.stringify(state.keywords)
        );
      }
    },

    // 최근 검색어 1개 클릭
    clickKeyword: (state, actions: PayloadAction<ISearchKeyword>) => {
      state.searchKeyword = actions.payload.searchKeyword;
      state.isOpen = false;
    },

    // 최근 검색어 1개 제거
    deleteKeyword: (state, actions: PayloadAction<IKeywordIndex>) => {
      state.searchKeyword = "";
      state.keywords.splice(actions.payload.index, 1);
      localStorage.setItem(
        state.searchCategory,
        JSON.stringify(state.keywords)
      );
    },

    // 최근 검색어 전체 제거
    deleteAllKeywords: (state) => {
      state.searchKeyword = "";
      state.keywords = [];
      localStorage.setItem(
        state.searchCategory,
        JSON.stringify(state.keywords)
      );
    },

    // 검색어 초기화
    resetKeyword: (state) => {
      state.searchKeyword = "";
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
