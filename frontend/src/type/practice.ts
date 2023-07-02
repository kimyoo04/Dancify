import { TThumbnail, TVideo, TViews } from "./posts";
import { Pose } from "./moveNet";
import { TFeedbackId } from "./feedbacks";

// practiceSlice.ts
export interface IPracticeState {
  step: TStep; // 연습의 단계
  playIndex: TPlayIndex; // 영상의 단계
  isRealMode: boolean; // 실전 모드 유무
  isSkeleton: boolean; // 스켈레톤 매핑 유무
  isMosaic: boolean; // 모자이크 유무
  isFullBody: boolean; // 전신 유무
  isPlaying: boolean; // SectionResult 컴포넌트 랜더링 유무
  isFinished: boolean; // 안무 연습 완료 유무 or 영상 재생 유무
  feedbackId: TFeedbackId;
  selectedSections: number[]; // 선택한 섹션 인덱스 리스트
  sectionPracticeArr: ISectionPractice[]; // 섹션별 연습 기록 리스트
}

// 구간별 평가 및 연습 정보
export interface ISectionPractice {
  sectionId: TSectionId;
  firstScore: TFirstScore;
  bestScore: TBestScore;
  firstJson?: Pose[][];
  bestJson?: Pose[][];
  playCounts: TPlayCounts;
  poseMessages: IPoseMessages;
}

// 구간별 첫 state 생성
// practiceSlice.ts ~ setFirstScore
export interface IUpdateSectionPractice {
  sectionId: TSectionId;
  score: TInitScore; // 첫 점수로 firstScore와 bestScore 둘 다 전달
  poseMessages: IPoseMessages;
  keypointJson: Pose[][];
}

// 구간별 pose에 대한 평가 4가지 누적 값
export interface IPoseMessages {
  Miss: number;
  Good: number;
  Great: number;
  Excellent: number;
}

// -----------------------------------------------------------

// GET /api/video-section/<postId>
export interface IPractice {
  dancerPost: IDancerPost;
  sections: ISection[];
}

export interface IDancerPost {
  postId: string;
  title: string;
  userId: string;
  nickname: string;
  content: string;
  createDate: string;
  video: TVideo;
  thumbnail: TThumbnail;
  keypoints: TKeypoints;
  views: TViews;
  feedbackPrice: number;
}

export interface ISection {
  sectionId: TSectionId;
  video: TVideo;
  thumbnail: TThumbnail;
  keypoints: TKeypoints;
}

export type TKeypoints = string;
export type TSectionNumber = number;
export type TSectionId = string;
export type TStep = number;
export type TFirstScore = number;
export type TBestScore = number;
export type TInitScore = number;
export type TPlayCounts = number;
export type TPlayIndex = 0 | 1 | 2 | 3 | 4;
export type TPlayOrdinal =
  | "첫번째"
  | "두번째"
  | "세번째"
  | "네번째"
  | "다섯번째";