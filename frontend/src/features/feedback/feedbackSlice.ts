import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISection, IFeedbackState, IDancerMessage } from "@type/feedbacks";

const initialState: IFeedbackState = {
  sectionIndex: 0,
  sections: [],
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // sections data 받기
    getSections: (state, actions: PayloadAction<ISection[]>) => {
      state.sections = actions.payload;
    },

    // 구간 선택
    selectSection: (state, actions: PayloadAction<number>) => {
      state.sectionIndex = actions.payload;
    },

    // section.danceableMessage 작성
    writingDanceableMessage: (state, actions: PayloadAction<string>) => {
      state.sections[state.sectionIndex].danceableMessage = actions.payload;
    },

    writingDancerMessage: (state, actions: PayloadAction<IDancerMessage>) => {
      // timeStamp로 dancerMessage 찾기
      const index = state.sections[state.sectionIndex].dancerMessage.findIndex(
        (message) => message.timeStamp === actions.payload.timeStamp
      );
      state.sections[state.sectionIndex].dancerMessage[index].message =
        actions.payload.message;
    },

    // sections.dancerMessage 추가
    addDancerMessage: (state, actions: PayloadAction<number>) => {
      const timeStamp = actions.payload;
      const isExist = state.sections[state.sectionIndex].dancerMessage.some(
        (message) => message.timeStamp === timeStamp
      );
      if (isExist) return; // timeStamp 중복 제거
      state.sections[state.sectionIndex].dancerMessage.push({
        timeStamp,
        message: "",
      });
    },

    // section.dancerMessage 제거
    removeDancerMessage: (
      state,
      actions: PayloadAction<{ timeStamp: number }>
    ) => {
      // timeStamp로 dancerMessage 찾기
      const index = state.sections[state.sectionIndex].dancerMessage.findIndex(
        (message) => message.timeStamp === actions.payload.timeStamp
      );
      state.sections[state.sectionIndex].dancerMessage.splice(index, 1);
    },
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;
