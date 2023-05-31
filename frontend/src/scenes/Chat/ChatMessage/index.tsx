import { IMessage } from "@type/chat";
import Image from "next/image";

export default function ChatMessage({ message }: { message: IMessage }) {
  const isChatbot = message.id !== "client"; // 챗봇인지 유저인지
  const messagePos = isChatbot ? "received-text" : "sent-text"; // 메세지 위치
  const messageBg = isChatbot ? "received-bg" : "sent-bg"; // 메세지 배경

  return (
    <div className={`${messagePos} px-1 py-1`}>
      {/* 챗봇의 프로필 이미지 */}
      {isChatbot && (
        <Image
          src={"/images/chatbot.png"}
          className="rounded-xl"
          width={36}
          height={36}
          quality={50}
          alt={"chatbot"}
        />
      )}

      {/* 메시지 */}
      <div className={`chat-textbox ${messageBg}`}>
        {/* 텍스트 영역 */}
        <p className="text-sm">
          {/* //! isChatbot 뺌 */}
          {isChatbot ? message.answer : message.question}
        </p>
      </div>
    </div>
  );
}
