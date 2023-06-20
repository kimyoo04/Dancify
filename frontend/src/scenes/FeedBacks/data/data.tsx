import { ArrowUpCircle, CheckCircle2, HelpCircle } from "lucide-react";

export const genres = [
  {
    value: "기본동작",
    label: "기본동작",
  },
  {
    value: "k-pop",
    label: "K-pop",
  },
  {
    value: "키즈",
    label: "키즈",
  },
  {
    value: "팝핀",
    label: "팝핀",
  },
  {
    value: "뮤지컬",
    label: "뮤지컬",
  },
];

export const statuses = [
  {
    value: "신청 전",
    label: "신청 전",
    icon: HelpCircle,
  },
  {
    value: "대기 중",
    label: "대기 중",
    icon: ArrowUpCircle,
  },
  {
    value: "완료",
    label: "완료",
    icon: CheckCircle2,
  },
];
