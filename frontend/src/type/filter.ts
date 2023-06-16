export interface IFilterState {
  sort: TSort;
  genre: TGenre;
}

export interface IFilterAction {
  sort?: TSort;
  genre?: TGenre;
}

export type TSort = "like" | "view" | "";
export type TGenre = string;
