import { ISection } from "@type/feedbacks";

export default function convertISectionToFormData(sections: ISection[]): FormData {
  const formData = new FormData();

  sections.forEach((section, index) => {
    formData.append(
      `danceableSectionId${index + 1}`,
      section.feedbackSectionId
    );
    formData.append(
      `timeStamps${index + 1}`,
      section.dancerMessage
        .map((dancer) => dancer.timeStamp.toString())
        .join("`")
    );
    formData.append(
      `feedbacks${index + 1}`,
      section.dancerMessage.map((dancer) => dancer.message).join("`")
    );

    formData.append(`video${index + 1}`, section.danceableVideo);
  });

  return formData;
}
