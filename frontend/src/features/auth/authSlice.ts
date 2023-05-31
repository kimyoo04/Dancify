// redux-toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, userPayload } from "@type/user";

const initialState: AuthState = {
  loading: true,
  isAuthenticated: false,
  user: { id: "", username: "", email: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin(state, action: PayloadAction<userPayload>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = { id: "", username: "", email: "" };
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
