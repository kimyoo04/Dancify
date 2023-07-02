import { IFeedbackDetail } from "@type/feedbacks";

export const feedbackDetailData: IFeedbackDetail = {
  feedbackId: "abc123",
  title: "Awesome Dance Performance",
  createDate: "2023-06-28",
  profileImage:
    "https://dancify-bucket.s3.ap-northeast-2.amazonaws.com/profile-image/user1.jpg",
  nickname: "JohnDoe",
  userId: "user123",
  status: "신청 전",
  isDancer: true,
  sections: [
    {
      feedbackSectionId: "section1",
      danceablevideo:
        "http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8",
      danceablemessage:
        "I really enjoyed the choreography in this section. It was so dynamic and synchronized.",
      dancerVideo: "https://example.com/dancer1",
      firstAiFeedback: "first json url",
      bestAiFeedback: "best json url",
      dancerMessage: [
        {
          timeStamp: 10,
          message: "Your footwork at 0:10 was impressive!",
        },
        {
          timeStamp: 25,
          message: "The jump at 0:25 was so smooth!",
        },
      ],
    },
    {
      feedbackSectionId: "section2",
      firstAiFeedback: "first json url",
      bestAiFeedback: "best json url",
      danceablevideo:
        "http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer3/fd32fhj890fjwefiwefjwe.m3u8",
      danceablemessage:
        "The second section had a great mix of different dance styles. It kept the performance interesting.",
      dancerVideo: "https://example.com/dancer2",
      dancerMessage: [
        {
          timeStamp: 5,
          message: "Your spins at 0:05 were incredible!",
        },
        {
          timeStamp: 15,
          message: "The formation change at 0:15 was so well-coordinated!",
        },
      ],
    },
  ],
};
