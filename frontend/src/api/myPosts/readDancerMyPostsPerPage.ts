import { AxiosError } from "axios";
import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

import { IDancerPostsPerPage } from "@type/dancerPosts";
import { TUserId } from "@type/auth";
import { IMyPostQueryParams } from "@type/myPosts";
import { useAppSelector } from "@toolkit/hook";
import { TSearchKeyword } from "@type/search";
import { TGenreValue, TSort } from "@type/filter";

export const readDancerMyPostsPerPage = async (
  page: number,
  searchKeyword: TSearchKeyword,
  sort: TSort,
  genre: TGenreValue,
  id: TUserId
) => {
  const params: IMyPostQueryParams = { page, user: id };

  if (searchKeyword !== "") params.q = searchKeyword;
  if (sort !== "new") params.sort = sort;
  if (genre !== "전체") params.genre = genre;

  try {
    const response = await axios.get(`/posts/dancer`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readDancerMyPostsPerPage.tsx", err);
    return { data: [] };
  }
};

export const useReadDancerMyPostsPerPage = (id: TUserId) => {
  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useInfiniteQuery<IDancerPostsPerPage, AxiosError>({
    queryKey: [
      `/my-posts/dancer`,
      "searchKeyword",
      searchKeyword,
      "sort",
      sort,
      "genre",
      genre,
    ],
    queryFn: ({ pageParam = 1 }) =>
      readDancerMyPostsPerPage(pageParam, searchKeyword, sort, genre, id),
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      } else {
        return undefined;
      }
    },
    cacheTime: 300000, // 5분
    staleTime: 240000, // 4분
    refetchOnMount: true, //페이지 재방문시 refetch 적용
    refetchOnWindowFocus: false, // 브라우저 포커징시 refetch 금지
  });
};
