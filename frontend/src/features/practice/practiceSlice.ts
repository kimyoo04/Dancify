import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFeedbackId } from "@type/feedbacks";
import {
  IPracticeState,
  IUpdateSectionPractice,
  TSectionId,
} from "@type/practice";

const initialState: IPracticeState = {
  step: 1, // 연습의 단계 인덱스
  playIndex: 0, // 영상의 단계 인덱스
  isRealMode: false, // 실전 모드 유무
  isSkeleton: false, // 스켈레톤 매핑 유무
  isFullBody: false, // 전신 유무
  isFinished: false, // SectionResult 컴포넌트 랜더링 유무
  isPlaying: false, // react-player 재생 유무
  feedbackId: "",
  selectedSections: [],
  sectionPracticeArr: [],
};

export const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    // 피드백 아이디 설정
    setFeedbackId: (state, action: PayloadAction<TFeedbackId>) => {
      state.feedbackId = action.payload;
    },

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
      const isSection = state.selectedSections.includes(sectionIndex);

      if (isSection) {
        // 선택된 section이 이미 있으면 제거
        state.selectedSections = state.selectedSections.filter(
          (section) => section !== sectionIndex
        );
      } else {
        // 선택된 section이 없으면 추가
        state.selectedSections.push(sectionIndex);
      }
    },
    // 구간 첫 시도에 다음으로 강제 이동한 경우 따로 예외처리 필요
    updateSectionForce: (state, action: PayloadAction<TSectionId>) => {
      const sectionId = action.payload;
      const sectionIndex = state.sectionPracticeArr.findIndex(
        (section) => section.sectionId === sectionId
      );
      const defaultPracticeArr = {
        sectionId,
        firstScore: 0,
        bestScore: 0,
        playCounts: 0,
        poseMessages: {
          Miss: 0,
          Good: 0,
          Great: 0,
          Excellent: 0,
        },
      };
      if (sectionIndex === -1) state.sectionPracticeArr.push(defaultPracticeArr);
    },
    // section의 대한 최초, 최고 점수 입력
    updateSectionPractice: (
      state,
      action: PayloadAction<IUpdateSectionPractice>
    ) => {
      const { video, sectionId, score, poseMessages, keypointJson } =
        action.payload;
      const sectionIndex = state.sectionPracticeArr.findIndex(
        (section) => section.sectionId === sectionId
      );
      if (sectionIndex === -1) {
        // 없으면 sectionPracticeArr에 추가
        state.sectionPracticeArr.push({
          video,
          sectionId,
          firstScore: score,
          bestScore: score,
          firstJson: keypointJson,
          bestJson: keypointJson,
          playCounts: 1,
          poseMessages,
        });
      } else if (score > state.sectionPracticeArr[sectionIndex].bestScore) {
        // bestScore와 poseMessages 갱신 및 playCounts 증가
        state.sectionPracticeArr[sectionIndex] = {
          ...state.sectionPracticeArr[sectionIndex],
          bestScore: score,
          // video: 비디오최고점수,
          bestJson: keypointJson,
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
