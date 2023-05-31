import axios from "@api/axiosInstance";
import { ISignUpForm } from "@type/signup";

export const signup = async (data: ISignUpForm) => {
  try {
    const response = await axios.post(`/account/signup/`, {
      userId: data.userId,
      username: data.username,
      password: data.password,
    });

    console.log(response);
    return true;
  } catch (err) {
    console.log("🚀 signup.tsx", err);
    return false;
  }
};
