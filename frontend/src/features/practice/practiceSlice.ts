import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IPracticeState,
  ISectionBestScore,
  ISectionPractice,
} from "@type/practice";

const initialState: IPracticeState = {
  step: 1,
  sectionPractice: [],
};

export const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    // step 증가
    increaseStep: (state) => {
      state.step += 1;
    },

    // section의 대한 최초, 최고 점수 입력
    setFirstScore: (state, action: PayloadAction<ISectionPractice>) => {
      state.sectionPractice.push(action.payload);
    },

    // section의 대한 최고 점수 갱신 및 playCounts 증가
    setBestScore: (state, action: PayloadAction<ISectionBestScore>) => {
      const { sectionId, bestScore } = action.payload;
      const sectionIndex = state.sectionPractice.findIndex(
        (section) => section.sectionId === sectionId
      );
      state.sectionPractice[sectionIndex] = {
        ...state.sectionPractice[sectionIndex],
        bestScore,
        playCounts: state.sectionPractice[sectionIndex].playCounts + 1,
      };
    },
  },
});

export const practiceActions = practiceSlice.actions;
export default practiceSlice.reducer;
