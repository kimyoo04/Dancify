import { TAngle, TErrorTime, TMessage, TScore, TSec } from "./feedbacks";

// json 파일의 타입 정의
export interface FeedbackJsonData {
  data: IEvalPerFrame[];
  error: IErrorData;
  avg_score: IAverageScore;
  message: TMessage[];
}

// 1초당 부위별 점수와 각도 데이터 타입
export interface IEvalPerFrame{
  sec: TSec;
  pelvis: IPelvis;
  shoulder: IShoulder;
  forearm: IForearm;
  leg: ILeg;
}

// 골반
export interface IPelvis {
  score: TScore;
  dancer_left_pelvic_angle: TAngle;
  dancer_right_pelvic_angle: TAngle;
  danceable_left_pelvic_angle: TAngle;
  danceable_right_pelvic_angle: TAngle;
}

// 어깨
export interface IShoulder {
  score: TScore;
  dancer_left_shoulder_angle: TAngle;
  dancer_right_shoulder_angle: TAngle;
  danceable_left_shoulder_angle: TAngle;
  danceable_right_shoulder_angle: TAngle;
}

// 팔
export interface IForearm {
  score: TScore;
  dancer_left_elbow_angle: TAngle;
  dancer_right_elbow_angle: TAngle;
  danceable_left_elbow_angle: TAngle;
  danceable_right_elbow_angle: TAngle;
}

// 다리
export interface ILeg {
  score: TScore;
  dancer_left_knee_angle: TAngle;
  dancer_right_knee_angle: TAngle;
  danceable_left_knee_angle: TAngle;
  danceable_right_knee_angle: TAngle;
}

// 에러난 시간대
export interface IErrorData {
  pelvis_error_time: TErrorTime[];
  shoulder_error_time: TErrorTime[];
  forearm_error_time: TErrorTime[];
  leg_error_time: TErrorTime[];
}

// 부위별 평균 점수
export interface IAverageScore {
  pelvis_score: TScore;
  shoulder_score: TScore;
  forearm_score: TScore;
  leg_score: TScore;
}
