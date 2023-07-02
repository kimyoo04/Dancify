import { ArrowUpCircle, CheckCircle2, HelpCircle } from "lucide-react";

export const genres = [
  {
    value: "basic",
    label: "기본동작",
  },
  {
    value: "kpop",
    label: "K-pop",
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
