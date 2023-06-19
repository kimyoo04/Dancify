import { AxiosError } from "axios";
import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";

import { IPostQueryParams } from "@type/posts";
import { IDancerPostsPerPage } from "@type/dancerPosts";

export const readDancerLikesPerPage = async (page: number) => {
  const params: IPostQueryParams = { page };

  try {
    const response = await axios.get(`/likes/dancer`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readDancerLikesPerPage.tsx", err);
    return { data: [] };
  }
};

export const useReadDancerLikesPerPage = () => {
  return useInfiniteQuery<IDancerPostsPerPage, AxiosError>({
    queryKey: [`/likes/dancer`],
    queryFn: ({ pageParam = 1 }) => readDancerLikesPerPage(pageParam),
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
