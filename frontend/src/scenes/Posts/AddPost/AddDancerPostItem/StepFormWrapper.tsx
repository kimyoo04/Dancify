import { Metadata } from "next";

import { Separator } from "@components/ui/separator";
import StepNav from "./StepNav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "1. 이용약관 동의",
    step: 1,
  },
  {
    title: "2. 동영상 세부 정보",
    step: 2,
  },
  {
    title: "3. 동영상 구간 설정",
    step: 3,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function StepFormWrapper({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold tracking-tight">
            댄서 게시글 작성
          </h2>
          <p className="text-muted-foreground">
            댄서블을 위한 안무 연습 영상을 업로드합니다.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col space-y-8">
          <nav>
            <StepNav items={sidebarNavItems} />
          </nav>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
