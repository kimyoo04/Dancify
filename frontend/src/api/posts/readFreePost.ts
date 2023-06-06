import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IFreePostDetail } from "@type/freePosts";

export const readFreePost = async (id: string) => {
  try {
    const response = await axios.get(`/posts/free/${id}`);
    return response.data;
  } catch (err) {
    console.log("🚀 readPost.tsx", err);
    return { data: [] };
  }
};

export const useReadFreePost = (id: string) => {
  return useQuery<IFreePostDetail>({
    queryKey: [`/posts/free/${id}`],
    queryFn: () => readFreePost(id),
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
  });
};
