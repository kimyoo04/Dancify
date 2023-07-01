import { AxiosError } from "axios";
import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";

import { TUserId } from "@type/auth";
import { TPostId } from "@type/posts";
import { IPractice } from "@type/practice";

export const readVideoSection = async (postId: TUserId) => {
  try {
    const response = await axios.get(`/video-section/${postId}`);
    return response.data;
  } catch (err) {
    console.error("🚀 readVideoSection.tsx", err);
    return { dancerPost: {}, sections: [] };
  }
};

export const useReadVideoSection = (postId: TPostId) => {
  return useQuery<IPractice, AxiosError>({
    queryKey: [`/video-section/${postId}`],
    queryFn: () => readVideoSection(postId),
    cacheTime: 600000, // 10분
    staleTime: 600000, // 10분
    onError: (err) => {
      console.error("🚀 useReadVideoSection.ts", err);
    }
  });
};
