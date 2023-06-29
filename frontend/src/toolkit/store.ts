import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/authSlice";
import searchReducer from "@features/search/searchSlice";
import likeReducer from "@features/like/likeSlice";
import filterReducer from "@features/filter/filterSlice";
import postReducer from "@features/post/postSlice";
import commentReducer from "@features/comment/commentSlice";
import sideBarReducer from "@features/sideBar/sideBarSlice";
import practiceReducer from "@features/practice/practiceSlice";
import feedbackReducer from "@features/feedback/feedbackSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    like: likeReducer,
    filter: filterReducer,
    post: postReducer,
    comment: commentReducer,
    sideBar: sideBarReducer,
    practice: practiceReducer,
    feedback: feedbackReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// useDispatch, useSelect를 사용할 때 필요
export type AppDispatch = typeof store.dispatch;
