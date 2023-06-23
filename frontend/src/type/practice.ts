import { TVideo } from "./posts";

// practiceSlice.ts
export interface IPracticeState {
  step: TStep;
  sectionPractice: ISectionPractice[];
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
  thumbnail: string;
  video: TVideo;
  feedbackPrice: number;
}

export interface ISection {
  sectionId: string;
  sectionNumber: number;
  video: TVideo;
}

// POST /api/dance/<sectionId>
export interface IPracticeResult {
  sectionId: TSectionId;
  formData: FormData; // { keyPoints: Pose, video: File }
}

export type TSectionNumber = number;
export type TSectionId = string;
export type TStep = number;
export type TFirstScore = number;
export type TBestScore = number;
export type TPlayCounts = number;
