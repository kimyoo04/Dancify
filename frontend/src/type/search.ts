export type TSearchCategoryEnglish = "FREE" | "VIDEO" | "DANCER";
export type TSearchCategoryKorean = "댄서게시판" | "자랑게시판" | "자유게시판";
export type TSearchKeyword = string;
// 검색 react-hook-form에 사용

export interface ISearchField {
  searchKeyword: TSearchKeyword;
}

// searchSlice에 사용
export interface ISearchState {
  isOpen: boolean;
  isFocus: boolean;
  searchCategory: TSearchCategoryEnglish;
  searchKeyword: TSearchKeyword;
  keywords: string[]; // localstorage에 저장되는 최근 검색어
}

// searchSlice에 사용
export interface ISearchCategory {
  searchCategory: TSearchCategoryEnglish;
}

// searchSlice에 사용
export interface ISearchKeyword {
  searchKeyword: TSearchKeyword;
}

// searchSlice에 사용
export interface IKeywordIndex {
  index: number;
}

// SearchRank 컴포넌트, readSearchRank 요청 함수에 사용
export interface ISearchRank {
  FREE: string[];
  VIDEO: string[];
  DANCER: string[];
}
