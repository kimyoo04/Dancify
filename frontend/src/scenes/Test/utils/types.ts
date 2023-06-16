export interface Pose {
  keypoints: Keypoint[];
  score: number;
}

export interface Keypoint {
  x: number;
  y: number;
  z?: number;
  score: number;
  name: string;
}

export interface Options {
  strategy?: "cosineSimilarity" | "cosineDistance" | "weightedDistance";
  customWeight?: WeightOption;
}

export interface WeightOption {
  mode: WeightOptionMode;
  scores: Record<string, number> | number[];
}

export type WeightOptionMode = "multiply" | "replace" | "add";
