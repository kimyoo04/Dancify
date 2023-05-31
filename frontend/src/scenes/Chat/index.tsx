import { useAppSelector } from "@toolkit/hook";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatAlert from "./ChatAlert";

export default function Chat() {
  const isAlert = useAppSelector((state) => state.chat.isAlert);

  return (
    <div className={`chat-popup`}>
      <div className="flex h-full flex-col items-center justify-between">
        {/* 헤더와 Sign out 버튼 */}
        <ChatHeader />

        {/* 저장된 최신 메시지들 */}
        <ChatMessages />

        {/* 설명, 입력창, 전송 버튼 */}
        <ChatInput />

        {/* 챗봇 답변 실패 알람 */}
        {isAlert && <ChatAlert />}
      </div>
    </div>
  );
}
