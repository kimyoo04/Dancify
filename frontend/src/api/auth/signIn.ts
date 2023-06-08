import axios from "@api/axiosInstance";
import { ISignInForm } from "@type/signIn";

export const signIn = async (data: ISignInForm) => {
  try {
    const response = await axios.post("/auth/signin", {
      userId: data.userId,
      password: data.password,
    });

    console.log(response.data);
    return true;
  } catch (err: any) {
    console.log("🚀 signIn.tsx", err);
    return err.response;
  }
};
