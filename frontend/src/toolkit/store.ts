import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/authSlice";
import searchReducer from "@features/search/searchSlice";
import likeReducer from "@features/like/likeSlice";
import filterReducer from "@features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    like: likeReducer,
    filter: filterReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
