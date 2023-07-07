import axios from "@api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TFeedbackId } from "@type/feedbacks";
import { ISectionPractice } from "@type/practice";

// 자유게시글 Create
export const postsPracticeData = async ({
  feedbackId,
  sectionPractice,
  recordedBlob,
  isMosaic,
}: {
  feedbackId: TFeedbackId;
  sectionPractice: ISectionPractice;
  recordedBlob: Blob;
  isMosaic: boolean;
}) => {
  // - feedbackId: 피드백 게시글 UUID
  // - sectionId: 댄서의 비디오 섹션
  // - video : 동영상 파일
  // - firstScore: json 파일
  // - bestScore: json 파일
  // - mosaic: 'true' 'false'

  const sectionId = sectionPractice.sectionId;
  // JSON 문자열을 Blob 객체로 변환
  const firstJson = new Blob([JSON.stringify(sectionPractice.firstJson)], {
    type: "application/json",
  });
  const bestJson = new Blob([JSON.stringify(sectionPractice.bestJson)], {
    type: "application/json",
  });

  const video = new File([recordedBlob], "video.mp4");

  // Blob 객체를 File 객체로 변환
  const firstScore = new File([firstJson], "firstScore.json");
  const bestScore = new File([bestJson], "bestScore.json");

  //댄서블의 keypoint와 녹화한 댄서블 영상을 POST 요청
  const formData = new FormData();
  formData.append("feedbackId", feedbackId);
  formData.append("sectionId", sectionId);
  formData.append("video", video);
  formData.append("firstScore", firstScore);
  formData.append("bestScore", bestScore);
  formData.append("mosaic", `${isMosaic}`); // "true" "false"

  try {
    await axios.post(`/dance`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (err) {
    console.error("🚀 postsPracticeData:", err);
    return false;
  }
};

// useMutation
export const usePostsPracticeDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsPracticeData,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`/feedbacks`],
      });
    },
    onError: (err) => {
      console.error("🚀 usePostsPracticeDataMutation:", err);
    },
  });
};
