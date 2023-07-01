import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { ISearchRank } from "@type/search";

export const readSearchRank = async () => {
  try {
    const response = await axios.get(`/search-rank`);
    return response.data;
  } catch (err) {
    console.log("🚀 readSearchRank.tsx", err);
    return { FREE: [], VIDEO: [], DANCER: [] };
  }
};

export const useReadSearchRank = () => {
  return useQuery<ISearchRank>({
    queryKey: [`/search-rank`],
    queryFn: readSearchRank,
    cacheTime: 600000, // 10분
    staleTime: 600000, // 10분
    onError: (err) => {
      console.error("🚀 useReadSearchRank.ts", err);
    }
  });
};
