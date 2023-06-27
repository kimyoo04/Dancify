import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPracticeState, IUpdateSectionPractice } from "@type/practice";

const initialState: IPracticeState = {
  step: 1, // 연습의 단계 인덱스
  playIndex: 0, // 영상의 단계 인덱스
  isRealMode: false, // 실전 모드 유무
  isSkeleton: false, // 스켈레톤 매핑 유무
  isFullBody: false, // 전신 유무
  isFinished: false, // SectionResult 컴포넌트 랜더링 유무
  isPlaying: false, // react-player 재생 유무

  selectedSections: [],
  sectionPracticeArr: [],
};

export const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    // step 증가
    moveNextStep: (state) => {
      state.step += 1;
    },

    // 구간 연습 종료
    finishSectionPlay: (state) => {
      state.isFinished = true;
      state.isPlaying = false;
    },

    // SectionPlay 컴포넌트 랜더링
    showSectionPlay: (state) => {
      state.isFinished = false;
    },

    // 영상 재생
    playVideo: (state) => {
      state.isPlaying = true;
    },

    // 전신 유무 확인
    checkFullBody: (state) => {
      state.isFullBody = true;
    },

    // 영상 단계 인덱스 증가
    moveNextSection: (state) => {
      state.playIndex += 1;
      state.isFinished = false;
    },

    // 실전 모드 토글
    toggleReal: (state) => {
      state.isRealMode = !state.isRealMode;
    },

    // 스켈레톤 유무 토글
    toggleSkeleton: (state) => {
      state.isSkeleton = !state.isSkeleton;
    },

    // section 복수 선택 토글
    toggleSelectedSections: (state, action: PayloadAction<number>) => {
      const sectionIndex = action.payload;
      // 선택된 section이 있는지 확인
      const isSection = state.selectedSections.findIndex(
        (section) => section === sectionIndex
      );
      // 선택된 section이 없으면 추가, 있으면 제거
      if (isSection === -1) {
        state.selectedSections.push(sectionIndex);
      } else {
        state.selectedSections.splice(sectionIndex, 1);
      }
    },

    // section의 대한 최초, 최고 점수 입력
    updateSectionPractice: (
      state,
      action: PayloadAction<IUpdateSectionPractice>
    ) => {
      const { sectionId, score, poseMessages } = action.payload;
      const sectionIndex = state.sectionPracticeArr.findIndex(
        (section) => section.sectionId === sectionId
      );
      if (sectionIndex === -1) {
        // 없으면 sectionPracticeArr에 추가
        state.sectionPracticeArr.push({
          sectionId: sectionId,
          firstScore: score,
          bestScore: score,
          playCounts: 1,
          poseMessages: action.payload.poseMessages,
        });
      } else if (score > state.sectionPracticeArr[sectionIndex].bestScore) {
        // bestScore와 poseMessages 갱신 및 playCounts 증가
        state.sectionPracticeArr[sectionIndex] = {
          sectionId: sectionId,
          firstScore: state.sectionPracticeArr[sectionIndex].firstScore,
          bestScore: score,
          playCounts: state.sectionPracticeArr[sectionIndex].playCounts + 1,
          poseMessages: poseMessages,
        };
      } else {
        // playCounts만 증가
        state.sectionPracticeArr[sectionIndex] = {
          ...state.sectionPracticeArr[sectionIndex],
          playCounts: state.sectionPracticeArr[sectionIndex].playCounts + 1,
        };
      }
    },

    // 연습 초기화
    resetPractice: (state) => {
      state.step = 1;
      state.playIndex = 0;
      state.isSkeleton = false;
      state.isFinished = false;
      state.isFullBody = false;
      state.isPlaying = false;
      state.selectedSections = [];
      state.sectionPracticeArr = [];
    },
  },
});

export const practiceActions = practiceSlice.actions;
export default practiceSlice.reducer;
