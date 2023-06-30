import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { IFreePostsPerPage } from "./freePosts";
import { IVideoPostsPerPage } from "./videoPosts";
import { IDancerPostsPerPage, IHistoriesPerPage } from "./dancerPosts";

export interface IUseInfniteFreePosts {
  data: InfiniteData<IFreePostsPerPage> | undefined;
  error: AxiosError<unknown, any> | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<IFreePostsPerPage, AxiosError<unknown, any>>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  status: "error" | "loading" | "success";
}

export interface IUseInfniteVideoPosts {
  data: InfiniteData<IVideoPostsPerPage> | undefined;
  error: AxiosError<unknown, any> | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<IVideoPostsPerPage, AxiosError<unknown, any>>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  status: "error" | "loading" | "success";
}

export interface IUseInfniteDancerPosts {
  data: InfiniteData<IDancerPostsPerPage> | undefined;
  error: AxiosError<unknown, any> | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<IDancerPostsPerPage, AxiosError<unknown, any>>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  status: "error" | "loading" | "success";
}

export interface IUseInfniteHistories {
  data: InfiniteData<IHistoriesPerPage> | undefined;
  error: AxiosError<unknown, any> | null;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<IHistoriesPerPage, AxiosError<unknown, any>>
  >;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  status: "error" | "loading" | "success";
}
