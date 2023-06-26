export interface IFilterState {
  sort: TSort;
  genre: TGenreValue;
}

export interface ISort {
  label: TSortLabel;
  value: TSort;
}

export interface IGenres {
  label: TGenreLabel;
  value: TGenreValue;
}

export type TSortLabel = "인기순" | "조회순" | "최신순";
export type TSort = "like" | "view" | "new";

export type TGenreLabel = "전체" | "기본동작" | "k-pop"
export type TGenreValue = "전체" | "basic" | "kpop"