import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IFreePostsPerPage } from "./freePosts";
import { IVideoPostsPerPage } from "./videoPosts";

export interface IUseInfnitePosts {
  data: InfiniteData<IFreePostsPerPage | IVideoPostsPerPage> | undefined;
  error: AxiosError<unknown, any> | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      IFreePostsPerPage | IVideoPostsPerPage,
      AxiosError<unknown, any>
    >
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  status: "error" | "loading" | "success";
}
