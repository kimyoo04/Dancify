import { AxiosError } from "axios";
import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

import { IPostQueryParams } from "@type/posts";
import { IFreePostsPerPage } from "@type/freePosts";

export const readFreeLikesPerPage = async (page: number) => {
  const params: IPostQueryParams = { page };

  try {
    const response = await axios.get(`/likes/free`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readFreeLikesPerPage.tsx", err);
    return { data: [] };
  }
};

export const useReadFreeLikesPerPage = () => {
  return useInfiniteQuery<IFreePostsPerPage, AxiosError>({
    queryKey: [`/likes/free`],
    queryFn: ({ pageParam = 1 }) => readFreeLikesPerPage(pageParam),
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
