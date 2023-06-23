import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IPracticeState,
  ISectionBestScore,
  ISectionPractice,
} from "@type/practice";

const initialState: IPracticeState = {
  step: 1,
  sectionPracticeArr: [],
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
      state.sectionPracticeArr.push(action.payload);
    },

    // section의 대한 최고 점수 갱신 및 playCounts 증가
    setBestScore: (state, action: PayloadAction<ISectionBestScore>) => {
      const { sectionId, bestScore } = action.payload;
      const sectionIndex = state.sectionPracticeArr.findIndex(
        (section) => section.sectionId === sectionId
      );
      state.sectionPracticeArr[sectionIndex] = {
        ...state.sectionPracticeArr[sectionIndex],
        bestScore,
        playCounts: state.sectionPracticeArr[sectionIndex].playCounts + 1,
      };
    },
  },
});

export const practiceActions = practiceSlice.actions;
export default practiceSlice.reducer;
