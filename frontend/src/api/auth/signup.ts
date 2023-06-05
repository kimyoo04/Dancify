import axios from "@api/axiosInstance";
import { ISignUpForm } from "@type/signup";

export const signup = async (data: ISignUpForm) => {
  try {
    const response = await axios.post(`/auth/signup`, {
      userId: data.userId,
      nickname: data.nickname,
      email: data.email,
      password: data.password,
      passwordCheck: data.passwordCheck,
    });

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("🚀 signup.tsx", err);
    return false;
  }
};
