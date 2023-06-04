import axios from "@api/axiosInstance";
import { IProfileInfoForm } from "@type/auth";

export const putProfile = async (data: IProfileInfoForm) => {
  try {
    const response = await axios.put("/auth/profile", {
      userId: data.userId,
      nickname: data.nickname,
      email: data.email,
      description: data.description,
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("🚀 profileInfo.tsx", err);
    return false;
  }
};
