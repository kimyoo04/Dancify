import {
  LayoutGrid,
  ListMusic,
  PlayCircle,
  Radio,
  User,
  Music2,
} from "lucide-react";

export const linksData = [
  {
    name: "댄서 게시판",
    icon: <PlayCircle className="mr-5" />,
    path: "",
  },
  {
    name: "자랑 게시판",
    icon: <LayoutGrid className="mr-5" />,
    path: "video",
  },
  {
    name: "자유 게시판",
    icon: <Radio className="mr-5" />,
    path: "free",
  },

  // ------------------------------------

  {
    name: "피드백 동영상",
    icon: <User className="mr-5" />,
    path: "feedbacks",
  },

  // ------------------------------------

  {
    name: "좋아요 표시한 글",
    icon: <ListMusic className="mr-5" />,
    path: "likes",
  },
  {
    name: "시청 기록",
    icon: <Music2 className="mr-5" />,
    path: "histories",
  },
  {
    name: "내 게시글",
    icon: <User className="mr-5" />,
    path: `posts`,
  },
];
