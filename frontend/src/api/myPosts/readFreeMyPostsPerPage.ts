import { AxiosError } from "axios";
import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

import { TUserId } from "@type/auth";
import { IMyPostQueryParams } from "@type/myPosts";
import { IFreePostsPerPage } from "@type/freePosts";
import { useAppSelector } from "@toolkit/hook";
import { TSearchKeyword } from "@type/search";
import { TGenreValue, TSort } from "@type/filter";

export const readFreeMyPostsPerPage = async (
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
    const response = await axios.get(`/posts/free`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readFreeMyPostsPerPage.tsx", err);
    return { data: [] };
  }
};

export const useReadFreeMyPostsPerPage = (id: TUserId) => {
  // 검색, 정렬, 장르, 페이징
  const searchKeyword = useAppSelector((state) => state.search.searchKeyword);
  const { sort, genre } = useAppSelector((state) => state.filter);

  return useInfiniteQuery<IFreePostsPerPage, AxiosError>({
    queryKey: [
      `/my-posts/free`,
      "searchKeyword",
      searchKeyword,
      "sort",
      sort,
      "genre",
      genre,
    ],
    queryFn: ({ pageParam = 1 }) =>
      readFreeMyPostsPerPage(pageParam, searchKeyword, sort, genre, id),
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
