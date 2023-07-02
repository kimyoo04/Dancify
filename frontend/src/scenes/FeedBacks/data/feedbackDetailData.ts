export const feedbackDetailData = {
  feedbackId: "abc123",
  title: "Awesome Dance Performance",
  createDate: "2023-06-28",
  nickname: "JohnDoe",
  userId: "user123",
  status: "신청 전",
  isDancer: true,
  firstAiFeedback:
    "Great job on the dance performance! Your moves were on point.",
  bestAiFeedback:
    "You nailed every step and brought so much energy to the performance. Well done!",
  sections: [
    {
      sectionId: "section1",
      danceablevideo:
        "http://dyago72jbsqcn.cloudfront.net/vod/dancer/dancer2/32e1209ujqwi0dj01289jd12.m3u8",
      danceablemessage:
        "I really enjoyed the choreography in this section. It was so dynamic and synchronized.",
      dancerVideo: "https://example.com/dancer1",
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
      sectionId: "section2",
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
