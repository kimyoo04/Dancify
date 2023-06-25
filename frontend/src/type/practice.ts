import { TThumbnail, TVideo } from "./posts";

// practiceSlice.ts
export interface IPracticeState {
  step: TStep; // 연습의 단계
  playIndex: TPlayIndex; // 영상의 단계
  isSkeleton: boolean; // 스켈레톤 매핑 유무
  selectedSections: number[]; // 선택한 섹션 인덱스 리스트
  sectionPracticeArr: ISectionPractice[]; // 섹션별 연습 기록 리스트
}

// 구간별 평가 및 연습 정보
// practiceSlice.ts ~ setFirstScore
export interface ISectionPractice {
  sectionId: TSectionId;
  firstScore: TFirstScore;
  bestScore: TBestScore;
  playCounts: TPlayCounts;
  poseEstimation: IPoseEstimation;
}

// 구간별 첫 state 생성
// practiceSlice.ts ~ setFirstScore
export interface ISetFirstScore {
  sectionId: TSectionId;
  initScore: TInitScore; // 첫 점수로 firstScore와 bestScore 둘 다 전달
  playCounts: TPlayCounts;
  poseEstimation: IPoseEstimation;
}

// bestScore가 클 때 state 갱신
// practiceSlice.ts ~ setBestScore
export interface ISetBestScore {
  sectionId: TSectionId;
  bestScore: TBestScore;
  poseEstimation: IPoseEstimation;
}

// 구간별 pose에 대한 평가 4가지 누적 값
export interface IPoseEstimation {
  miss: number;
  good: number;
  great: number;
  excellent: number;
}

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
  feedbackPrice: number;
}

export interface ISection {
  sectionId: TSectionId;
  video: TVideo;
  thumbnail: TThumbnail;
  keypoints: TKeypoints;
}

// POST /api/dance/<sectionId>
export interface IPracticeResult {
  sectionId: TSectionId;
  formData: FormData; // { keyPoints: Pose, video: File }
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
