import { TabsList, TabsTrigger } from "@components/ui/tabs";

export default function NavTab({ status }: { status: string }) {
  return (
    <TabsList>
      <TabsTrigger value="aiFeedback">AI 피드백</TabsTrigger>

      {status === "신청 전" ? (
        <TabsTrigger
          value="feedbackRequest"
          className="ml-1 border border-primary"
        >
          댄서 피드백 요청
        </TabsTrigger>
      ) : status === "대기 중" ? (
        <TabsTrigger value="feedbackWaiting">댄서 피드백 대기</TabsTrigger>
      ) : (
        <TabsTrigger value="feedbackFinished">댄서 피드백</TabsTrigger>
      )}
    </TabsList>
  );
}
