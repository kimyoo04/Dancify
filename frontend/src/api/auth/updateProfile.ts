import axios from "@api/axiosInstance";
import { IProfileInfoForm } from "@type/auth";

export const updateProfile = async (data: IProfileInfoForm) => {
  try {
    const profileData: IProfileInfoForm = {
      userId: data.userId,
      nickname: data.nickname,
      email: data.email,
    };
    // 폼 정보에 입력이 있는 경우 데이터에 포함
    if (data.description) profileData.description = data.description;
    if (data.profileImage) profileData.profileImage = data.profileImage;

    const response = await axios.patch("/auth/profile", profileData);
    console.log("🚀 profileInfo.tsx", response.data);
    return true;
  } catch (err) {
    console.log("🚀 profileInfo.tsx", err);
    return false;
  }
};
