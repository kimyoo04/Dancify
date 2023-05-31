import axios from "@api/axiosInstance";
import { ISignInForm } from "@type/signin";

export const signin = async (data: ISignInForm) => {
  try {
    const response = await axios.post("/account/signin/", {
      userId: data.userId,
      password: data.password,
    });

    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    return false;
  }
};
