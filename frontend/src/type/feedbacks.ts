export interface IFeedback {
  id: number;
  thumbnail: string;
  genre: string;
  title: string;
  nickname: string;
  status: string;
  createDate: string;
}

export interface Pelvis {
  score: number;
  dancer_left_pelvic_angle: number;
  dancer_right_pelvic_angle: number;
  danceable_left_pelvic_angle: number;
  danceable_right_pelvic_angle: number;
}

export interface Shoulder {
  score: number;
  dancer_left_shoulder_angle: number;
  dancer_right_shoulder_angle: number;
  danceable_left_shoulder_angle: number;
  danceable_right_shoulder_angle: number;
}

export interface Forearm {
  score: number;
  dancer_left_elbow_angle: number;
  dancer_right_elbow_angle: number;
  danceable_left_elbow_angle: number;
  danceable_right_elbow_angle: number;
}

export interface Leg {
  score: number;
  dancer_left_knee_angle: number;
  dancer_right_knee_angle: number;
  danceable_left_knee_angle: number;
  danceable_right_knee_angle: number;
}

export interface ErrorData {
  pelvis_error_time: string[];
  shoulder_error_time: string[];
  forearm_error_time: string[];
  leg_error_time: string[];
}

export interface AverageScore {
  pelvis_score: number;
  shoulder_score: number;
  forearm_score: number;
  leg_score: number;
}

export interface PartData{
  sec: number;
  pelvis: Pelvis;
  shoulder: Shoulder;
  forearm: Forearm;
  leg: Leg;
}

export interface FeedbackData {
  data: PartData[];
  error: ErrorData;
  avg_score: AverageScore;
  message: string[];
}
