import { createSlice } from "@reduxjs/toolkit";
import { ISideBarState } from "@type/sideBar";

const initialState: ISideBarState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sideBar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const sidebarActions = sidebarSlice.actions;
export default sidebarSlice.reducer;
