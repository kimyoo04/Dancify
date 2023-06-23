import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IPracticeState,
  ISectionBestScore,
  ISectionPractice,
} from "@type/practice";

const initialState: IPracticeState = {
  step: 1,
  isSkeleton: false,
  selectedSections: [],
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

    // 스켈레톤 유무 토글
    toggleSkeleton: (state) => {
      state.isSkeleton = !state.isSkeleton;
    },

    // section 복수 선택 토글
    toggleSelectedSections: (state, action: PayloadAction<number>) => {
      const sectionId = action.payload;
      // 선택된 section이 있는지 확인
      const sectionIndex = state.selectedSections.findIndex(
        (section) => section === sectionId
      );
      // 선택된 section이 없으면 추가, 있으면 제거
      if (sectionIndex === -1) {
        state.selectedSections.push(sectionId);
      } else {
        state.selectedSections.splice(sectionIndex, 1);
      }
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
