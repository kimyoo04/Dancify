import { TUserId } from "./auth";
import { TGenre, TSort } from "./filter";
import { TSearchKeyword } from "./search";

export interface IMyPostQueryParams {
  page: number;
  user: TUserId;
  q?: TSearchKeyword;
  sort?: TSort;
  genre?: TGenre;
}
