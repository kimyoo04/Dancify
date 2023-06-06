import axios from "@api/axiosInstance";
import { IProfileImageForm } from "@type/auth";

export const putProfileImage = async (data: IProfileImageForm) => {
  try {
    const response = await axios.put("/auth/profile/image", {
      profileImage: data.profileImage,
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("🚀 profileImage.tsx", err);
    return false;
  }
};
