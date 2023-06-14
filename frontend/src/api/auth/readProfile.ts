import axios from "@api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IProfile } from "@type/auth";

export const readProfile = async () => {
  try {
    const response = await axios.get(`/auth/profile`);
    return response.data;
  } catch (err) {
    console.log("🚀 readProfile.tsx", err);
    return null;
  }
};

export const useReadProfile = () => {
  return useQuery<IProfile>({
    queryKey: [`/profile`],
    queryFn: readProfile,
    refetchOnMount: "always",
  });
};
