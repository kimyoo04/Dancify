import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IProfile } from "@type/auth";

export const readProfile = async (): Promise<IProfile | null> => {
  try {
    const response = await axios.get(`/auth/profile`);
    return response.data;
  } catch (err) {
    console.log("🚀 readProfile.tsx", err);
    return null;
  }
};

export const useReadProfile = () => {
  return useQuery<IProfile | null>({
    queryKey: [`/profile`],
    queryFn: readProfile,
    refetchOnMount: "always",
    onError: (err) => {
      console.error("🚀 useReadProfile:", err);
    },
  });
};
