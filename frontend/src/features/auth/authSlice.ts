// redux-toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, userPayload } from "@type/auth";

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  userId: "",
  nickname: "",
  isDancer: undefined,
  profileImage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<userPayload>) {
      const { userId, nickname, isDancer, profileImage } = action.payload;

      state.isLoading = false;
      state.isAuthenticated = true;
      state.userId = userId;
      state.nickname = nickname;
      state.isDancer = isDancer;
      state.profileImage = profileImage;
    },
    logOut(state) {
      state.isAuthenticated = false;
      state.userId = "";
      state.nickname = "";
      state.isDancer = undefined;
      state.profileImage = null;
    },
    stopIsLoading(state) {
      state.isLoading = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
