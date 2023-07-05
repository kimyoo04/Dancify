import { ISection } from "@type/feedbacks";

export default function convertISectionToFormData(
  sections: ISection[],
  videoFileArr: {
    [key: string]: { file: File; filename: string };
  }
): FormData {
  const formData = new FormData();

  sections.forEach((section, index) => {
    formData.append(
      `danceableSectionId${index + 1}`,
      section.feedbackSectionId
    );

    // 빈문자열인 피드백 응답 내용은 POST 요청에서 제외
    const dancerMessages = section.dancerMessage.filter(
      (dancer) => dancer.message !== ""
    );

    formData.append(
      `timeStamps${index + 1}`,
      dancerMessages
        .map((dancer) => dancer.timeStamp.toString())
        .join("`")
    );
    formData.append(
      `feedbacks${index + 1}`,
      dancerMessages.map((dancer) => dancer.message).join("`")
    );
  });

  // 비디오 파일 넣기
  Object.keys(videoFileArr).forEach((key) => {
    formData.append(`video${Number(key) + 1}`, videoFileArr[key].file);
  });

  return formData;
}
