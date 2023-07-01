import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IVideoPostDetail } from "@type/videoPosts";

export const readVideoPost = async (id: string) => {
  try {
    const response = await axios.get(`/posts/video/${id}`);
    return response.data;
  } catch (err) {
    console.log("🚀 readVideoPost.tsx", err);
    return { data: [] };
  }
};

export const useReadVideoPost = (id: string) => {
  return useQuery<IVideoPostDetail>({
    queryKey: [`/postDetail/${id}`],
    queryFn: () => readVideoPost(id),
    refetchOnMount: "always", // 유저폼 활성화를 위해 설정
    onError: (err) => {
      console.error("🚀 useReadVideoPost.ts", err);
    },
  });
};
