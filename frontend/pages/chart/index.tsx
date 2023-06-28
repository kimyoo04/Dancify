import MainLayout from "@layouts/MainLayout";
import ScoreBoard from "@scenes/Practice/Result/ScoreBoard";
import StackedBar from "@scenes/Practice/Result/StackedBarChart";
import FeedbackChart from "@scenes/Practice/Result/FeedbackChart";
import React from "react";
import { IPracticeState, IPoseMessages } from "@type/practice";
import { FeedbackData } from "@type/feedbacks";

export default function SignUpPage() {
  const dummyData1 = {
    Miss: 6,
    Good: 45,
    Great: 23,
    Excellent: 4,
  };

  const dummyData2 = {
    step: "Step 1",
    playIndex: 1,
    sectionPracticeArr: [
      {
        sectionId: "Section 1",
        firstScore: 80,
        bestScore: 90,
        playCounts: 5,
        poseMessages: {
          Miss: 2,
          Good: 1,
          Great: 2,
          Excellent: 5,
        },
      },
      {
        sectionId: "Section 3",
        firstScore: 70,
        bestScore: 85,
        playCounts: 3,
        poseMessages: {
          Miss: 1,
          Good: 1,
          Great: 1,
          Excellent: 3,
        },
      },
      {
        sectionId: "Section 4",
        firstScore: 75,
        bestScore: 95,
        playCounts: 7,
        poseMessages: {
          Miss: 3,
          Good: 2,
          Great: 1,
          Excellent: 1,
        },
      },
      {
        sectionId: "Section 2",
        firstScore: 60,
        bestScore: 80,
        playCounts: 4,
        poseMessages: {
          Miss: 2,
          Good: 1,
          Great: 1,
          Excellent: 0,
        },
      },
    ],
  };

  const dummyData3 = {
    "data": [
        {
            "sec": 1,
            "pelvis": {
                "score": 96,
                "dancer_left_pelvic_angle": 164.25,
                "dancer_right_pelvic_angle": 162.651,
                "danceable_left_pelvic_angle": 169.695,
                "danceable_right_pelvic_angle": 170.816
            },
            "shoulder": {
                "score": 87,
                "dancer_left_shoulder_angle": 103.353,
                "dancer_right_shoulder_angle": 101.362,
                "danceable_left_shoulder_angle": 78.234,
                "danceable_right_shoulder_angle": 83.239
            },
            "forearm": {
                "score": 95,
                "dancer_left_elbow_angle": 177.432,
                "dancer_right_elbow_angle": 176.524,
                "danceable_left_elbow_angle": 166.889,
                "danceable_right_elbow_angle": 174.277
            },
            "leg": {
                "score": 97,
                "dancer_left_knee_angle": 179.014,
                "dancer_right_knee_angle": 177.747,
                "danceable_left_knee_angle": 173.834,
                "danceable_right_knee_angle": 173.704
            }
        },
        {
            "sec": 2,
            "pelvis": {
                "score": 92,
                "dancer_left_pelvic_angle": 165.627,
                "dancer_right_pelvic_angle": 162.054,
                "danceable_left_pelvic_angle": 157.268,
                "danceable_right_pelvic_angle": 163.045
            },
            "shoulder": {
                "score": 81,
                "dancer_left_shoulder_angle": 53.755,
                "dancer_right_shoulder_angle": 41.712,
                "danceable_left_shoulder_angle": 21.539,
                "danceable_right_shoulder_angle": 21.031
            },
            "forearm": {
                "score": 74,
                "dancer_left_elbow_angle": 122.393,
                "dancer_right_elbow_angle": 61.151,
                "danceable_left_elbow_angle": 130.561,
                "danceable_right_elbow_angle": 128.56
            },
            "leg": {
                "score": 97,
                "dancer_left_knee_angle": 179.12,
                "dancer_right_knee_angle": 177.438,
                "danceable_left_knee_angle": 173.46,
                "danceable_right_knee_angle": 173.445
            }
        },
        {
            "sec": 3,
            "pelvis": {
                "score": 88,
                "dancer_left_pelvic_angle": 162.71,
                "dancer_right_pelvic_angle": 164.235,
                "danceable_left_pelvic_angle": 145.876,
                "danceable_right_pelvic_angle": 148.973
            },
            "shoulder": {
                "score": 75,
                "dancer_left_shoulder_angle": 72.984,
                "dancer_right_shoulder_angle": 61.2,
                "danceable_left_shoulder_angle": 24.596,
                "danceable_right_shoulder_angle": 27.859
            },
            "forearm": {
                "score": 64,
                "dancer_left_elbow_angle": 158.29,
                "dancer_right_elbow_angle": 113.655,
                "danceable_left_elbow_angle": 90.16,
                "danceable_right_elbow_angle": 89.809
            },
            "leg": {
                "score": 93,
                "dancer_left_knee_angle": 178.623,
                "dancer_right_knee_angle": 176.084,
                "danceable_left_knee_angle": 165.218,
                "danceable_right_knee_angle": 167.739
            }
        },
        {
            "sec": 4,
            "pelvis": {
                "score": 92,
                "dancer_left_pelvic_angle": 159.437,
                "dancer_right_pelvic_angle": 160.471,
                "danceable_left_pelvic_angle": 176.49,
                "danceable_right_pelvic_angle": 172.231
            },
            "shoulder": {
                "score": 86,
                "dancer_left_shoulder_angle": 16.698,
                "dancer_right_shoulder_angle": 16.188,
                "danceable_left_shoulder_angle": 38.35,
                "danceable_right_shoulder_angle": 42.667
            },
            "forearm": {
                "score": 50,
                "dancer_left_elbow_angle": 175.401,
                "dancer_right_elbow_angle": 175.22,
                "danceable_left_elbow_angle": 86.644,
                "danceable_right_elbow_angle": 85.046
            },
            "leg": {
                "score": 87,
                "dancer_left_knee_angle": 177.981,
                "dancer_right_knee_angle": 176.256,
                "danceable_left_knee_angle": 153.873,
                "danceable_right_knee_angle": 155.849
            }
        },
    ],
    "error": {
        "pelvis_error_time": [
            "42~43",
            "67",
            "74",
            "93"
        ],
        "shoulder_error_time": [
            "2~3",
            "15~19",
            "22~25",
            "28~29",
            "31~32",
            "35~36",
            "41",
            "45",
            "49~52",
            "54~56",
            "59~61",
            "63~68",
            "70~71",
            "73~79",
            "82~88",
            "91",
            "95~96",
            "99"
        ],
        "forearm_error_time": [
            "2~99"
        ],
        "leg_error_time": [
            "19",
            "23",
            "25~26",
            "37",
            "39",
            "43",
            "51",
            "54",
            "67",
            "70",
            "74~75",
            "86"
        ]
    },
    "avg_score": {
        "pelvis_score": 91.87,
        "shoulder_score": 82.51,
        "forearm_score": 62.76,
        "leg_score": 90.51
    },
    "message": [
        "골반이 가장 높은 평균 점수를 가졌습니다.",
        "팔이 가장 낮은 평균 점수를 가졌습니다."
    ]
}

  return (
    <MainLayout>
      <ScoreBoard scoreToMessage={dummyData1 as IPoseMessages} />
      <StackedBar Practice={dummyData2 as IPracticeState} />
      <FeedbackChart feedback={dummyData3 as FeedbackData} />
    </MainLayout>
  );
}
