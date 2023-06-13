import axios from "@api/axiosInstance";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IVideoPostsPerPage } from "@type/videoPosts";
import { AxiosError } from "axios";

export const readVideoPostsPerPage = async (page: number) => {
  const params = { page };
  try {
    const response = await axios.get(`/posts/video`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readVideoPostsPerPage.tsx", err);
    return { data: [] };
  }
};

export const useReadVideoPostsPerPage = () => {
  return useInfiniteQuery<IVideoPostsPerPage, AxiosError>({
    queryKey: [`/posts/video`],
    queryFn: ({ pageParam = 1 }) => readVideoPostsPerPage(pageParam),
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
