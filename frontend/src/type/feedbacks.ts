import { TIsDancer, TNickname, TProfileImg, TUserId } from "./auth";
import { TGenreValue } from "./filter";
import { TThumbnail, TTitle, TCreateDate, TVideo } from "./posts";
import { TSectionId } from "./practice";

// feedbackSlice 에 사용
export interface IFeedbackState {
  sectionIndex: TSectionIndex;
  sections: ISection[];
  dancerMessage: IDancerMessage[]; // 기본 값으로 인해 따로 분리
}

export interface ISection {
  feedbackSectionId: TSectionId;
  danceablevideo: TVideo;
  danceablemessage: TMessage;
  dancerVideo: TVideo;
  dancerMessage: IDancerMessage[]; // 기본 값으로 인해 따로 분리
}

// 피드백 게시글 목록
export interface IFeedback {
  id: TFeedbackId;
  thumbnail: TThumbnail;
  genre: TGenreValue;
  title: TTitle;
  profileImage: TProfileImg;
  nickname: TNickname;
  status: TStatus;
  createDate: TCreateDate;
}

// 피드백 상세 게시글
export interface IFeedbackDetail {
  feedbackId: TFeedbackId;
  title: TTitle;
  createDate: TCreateDate;
  profileImage: TProfileImg;
  nickname: TNickname; // 댄서블 닉네임 or 댄서 닉네임
  userId: TUserId; // 댄서블 아이디
  status: TStatus;
  isDancer: TIsDancer;
  sections: IFeedbackSection[]; // 구간별 피드백 질문과 답변
}

export interface IFeedbackSection {
  feedbackSectionId: TSectionId;
  firstAiFeedback: string;
  bestAiFeedback: string;
  danceablevideo: TVideo;
  danceablemessage?: TMessage;
  dancerVideo?: TVideo;
  dancerMessage?: IDancerMessage[]; // 타임스탬프와 메시지
}

export interface IDancerMessage {
  timeStamp: number;
  message: TMessage;
}

// 댄서블이 댄서에게 피드백 요청 데이터
export interface IFeedbackRequest {
  sections: IFeedbackRequestSection[];
}

export interface IFeedbackRequestSection {
  feedbackSectionId: TSectionId;
  message: TMessage;
}

// 댄서가 댄서블에게 피드백하는 데이터
// "sectionId1": string,
// "timeStamp1": int`int
// "feedbacks1": string`string
// "video1": 동영상
// "sectionId2": string,
// "timeStamp2": int`int
// "feedbacks2": string`string
// "video2": 동영상

export type TSectionIndex = number;
export type TFeedbackId = string;
export type TStatus = "신청 전" | "대기 중" | "완료";
export type TScore = number;
export type TMessage = string;
export type TAngle = number;
export type TSec = number;
export type TErrorTime = string;
export type TContent = string;
export type TError =
  | "pelvis_error_time"
  | "shoulder_error_time"
  | "forearm_error_time"
  | "leg_error_time";