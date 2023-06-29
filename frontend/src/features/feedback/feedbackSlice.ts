import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDancerMessage, ISection, IFeedbackState } from "@type/feedbacks";

const initialState: IFeedbackState = {
  sectionIndex: 0,
  sections: []
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

    // section.danceablemessage 작성
    writingDanceablemessage: (state, actions: PayloadAction<string>) => {
      state.sections[state.sectionIndex].danceablemessage = actions.payload;
    },

    // sections.dancerMessage 추가
    addDancermessage: (state, actions: PayloadAction<IDancerMessage>) => {
      state.sections[state.sectionIndex].dancerMessage?.push(actions.payload);
    },

    // section.dancerMessage 제거
    removeDancermessage: (state, actions: PayloadAction<number>) => {
      state.sections[state.sectionIndex].dancerMessage?.splice(actions.payload, 1);
    }
  },
});

export const feedbackActions = feedbackSlice.actions;
export default feedbackSlice.reducer;
