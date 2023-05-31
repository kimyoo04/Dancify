import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IPostDataArr } from "@type/posts";
import { AxiosError } from "axios";

export const readPosts = async (page: number) => {
  const params = { page };
  try {
    const response = await axios.get(`/posts`, { params });
    return response.data;
  } catch (err) {
    console.log("🚀 readPosts.tsx", err);
    return { data: [] };
  }
};

export const useReadPosts = () => {
  return useQuery<IPostDataArr, AxiosError>({
    queryKey: ["read", "posts"],
    queryFn: ({ pageParam = 0 }) => readPosts(pageParam),
    cacheTime: 300000, // 5분
    staleTime: 240000, // 4분
    refetchOnMount: true, //페이지 재방문시 refetch 적용
    refetchOnWindowFocus: false, // 브라우저 포커징시 refetch 금지
  });
};
