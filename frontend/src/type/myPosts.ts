import { TUserId } from "./auth";
import { TGenreValue, TSort } from "./filter";
import { TSearchKeyword } from "./search";

export interface IMyPostQueryParams {
  page: number;
  user: TUserId;
  q?: TSearchKeyword;
  sort?: TSort;
  genre?: TGenreValue;
}
