export interface IFilterState {
  sort: string;
  genre: string;
}

export interface IFilterAction {
  sort?: "like" | "view";
  genre?: string; // 임시
}
