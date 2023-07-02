// redux-toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import {
  IPostEditorState,
  IFreePostInfo,
  ITimeStamp,
  IVideoPostInfo,
  IDancerPostInfo,
} from "@type/postEditor";
import { TContent, TPostId, TTitle, TVideo } from "@type/posts";

const initialState: IPostEditorState = {
  step: 1,
  isAgree: false,
  isMosaic: false,
  genre: "",
  postId: "",
  postTitle: "",
  postContent: "",
  postImage: "",
  postVideo: "",
  feedbackPrice: 0,
  timeStamps: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // 자유 게시판 데이터 적용
    getFreePostInfo: (state, actions: PayloadAction<IFreePostInfo>) => {
      state.postId = actions.payload.postId;
      state.isAgree = false;
      state.isMosaic = false;
      state.genre = "";
      state.postTitle = actions.payload.postTitle;
      state.postContent = actions.payload.postContent;
      state.postImage = actions.payload.postImage;
      state.postVideo = "";
      state.feedbackPrice = 0;
    },

    // 자랑 게시판 데이터 적용
    getVideoPostInfo: (state, actions: PayloadAction<IVideoPostInfo>) => {
      state.postId = actions.payload.postId;
      state.isAgree = false;
      state.isMosaic = false;
      state.genre = "";
      state.postTitle = actions.payload.postTitle;
      state.postContent = actions.payload.postContent;
      state.postImage = "";
      state.postVideo = actions.payload.postVideo;
      state.feedbackPrice = 0;
    },

    // 댄서 게시판 데이터 적용
    getPostDancerInfo: (state, actions: PayloadAction<IDancerPostInfo>) => {
      state.postId = actions.payload.postId;
      state.isAgree = false;
      state.isMosaic = false;
      state.genre = actions.payload.genre;
      state.postTitle = actions.payload.postTitle;
      state.postContent = actions.payload.postContent;
      state.postImage = "";
      state.postVideo = actions.payload.postVideo;
      state.feedbackPrice = actions.payload.feedbackPrice;
    },

    // 댄서, 자랑, 자유 게시판 가능
    writingTitle: (state, action: PayloadAction<TTitle>) => {
      state.postTitle = action.payload;
    },
    // 댄서, 자랑, 자유 게시판 가능
    writingContent: (state, action: PayloadAction<TContent>) => {
      state.postContent = action.payload;
    },

    // 모든 게시글 정보 초기화
    resetPostInfo: (state) => {
      state.step = 1;
      state.isAgree = false;
      state.isMosaic = false;
      state.genre = "";
      state.postId = "";
      state.postTitle = "";
      state.postContent = "";
      state.feedbackPrice = 0;
      state.timeStamps = [];
    },

    toggleAgree: (state) => {
      state.isAgree = !state.isAgree;
    },

    toggleMosaic: (state) => {
      state.isMosaic = !state.isMosaic;
    },

    selectGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },

    setFeedbackPrice: (state, action: PayloadAction<number>) => {
      state.feedbackPrice = action.payload;
    },

    uploadDancerPost: (
      state,
      action: PayloadAction<{ postId: TPostId; video: TVideo }>
    ) => {
      state.postId = action.payload.postId;
      state.postVideo = action.payload.video;
    },

    movePrevStep: (state) => {
      state.step -= 1;
    },

    moveNextStep: (state) => {
      state.step += 1;
    },

    createTimeStamp: (state, action: PayloadAction<ITimeStamp>) => {
      // state.timeStamp에 값이 20개 초과이면 적용 안함
      if (state.timeStamps.length >= 10) return;

      // state.timeStamp에 값이 있으면 삭제, 없으면 추가
      const index = state.timeStamps.findIndex(
        (timeStamp) => timeStamp.time === action.payload.time
      );
      if (index !== -1) {
        state.timeStamps.splice(index, 1);
      } else {
        state.timeStamps.push(action.payload);
      }
      // state.timeStamp 오름차순 정렬
      state.timeStamps.sort((a, b) => a.time - b.time);
    },

    removeTimeStamp: (state, action: PayloadAction<number>) => {
      const index = state.timeStamps.findIndex(
        (timeStamp) => timeStamp.time === action.payload
      );
      if (index !== -1) {
        state.timeStamps.splice(index, 1);
      }
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice.reducer;
