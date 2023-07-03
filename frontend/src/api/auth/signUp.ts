import axios from "@api/axiosInstance";
import { ISignUpForm } from "@type/signUp";

export const signUp = async (data: ISignUpForm) => {
  try {
    const response = await axios.post(`/auth/signup`, {
      userId: data.userId,
      nickname: data.nickname,
      email: data.email,
      phone: data.phone,
      password: data.password,
      passwordCheck: data.passwordCheck,
      isDancer: data.isDancer,
    });

    console.log(response.data);
    return true;
  } catch (err: any) {
    console.log("🚀 signup.tsx", err);
    return err
  }
};
