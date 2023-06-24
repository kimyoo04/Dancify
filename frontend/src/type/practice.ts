import { TThumbnail, TVideo } from "./posts";

// practiceSlice.ts
export interface IPracticeState {
  step: TStep; // 현재 단계
  isSkeleton: boolean; // 스켈레톤 매핑 유무
  selectedSections: number[]; // 선택한 섹션 인덱스 리스트
  sectionPracticeArr: ISectionPractice[]; // 섹션별 연습 기록 리스트
}

// practiceSlice.ts ~ setFirstScore
export interface ISectionPractice {
  sectionNumber: TSectionNumber;
  sectionId: TSectionId;
  firstScore: TFirstScore;
  bestScore: TBestScore;
  playCounts: TPlayCounts;
}

// practiceSlice.ts ~ setBestScore
export interface ISectionBestScore {
  sectionId: TSectionId;
  bestScore: TBestScore;
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
export type TPlayCounts = number;
