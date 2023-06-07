import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IFreePostsPerPage } from "@type/freePosts";
import { AxiosError } from "axios";

export const readFreePostsPerPage = async (page: number) => {
  const params = { page };
  try {
    const response = await axios.get(`/posts/free`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readFreePostsPerPage.tsx", err);
    return { data: [] };
  }
};

export const useReadFreePostsPerPage = () => {
  return useInfiniteQuery<IFreePostsPerPage, AxiosError>({
    queryKey: [`/posts/free`],
    queryFn: ({ pageParam = 1 }) => readFreePostsPerPage(pageParam),
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
