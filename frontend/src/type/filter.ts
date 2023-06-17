export interface IFilterState {
  sort: TSort;
  genre: TGenre;
}

export interface ISort {
  label: TSortLabel;
  value: TSort;
}

export interface IGenres {
  genre: TGenre;
}

export type TSortLabel = "인기순" | "조회순" | "최신순";
export type TSort = "like" | "view" | "new";

export type TGenre = "전체" | "기본동작" | "k-pop" | "키즈" | "팝핀" | "뮤지컬";
