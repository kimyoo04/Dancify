import Image from "next/image";

export default function ChatGPTIntro() {
  return (
    <div className="col-center py-8">
      <div className="flex w-full border-b pb-2">
        <h1 className="text-2xl font-medium">챗봇 서비스</h1>
      </div>

      <div className="col-center w-full gap-8 py-8 xl:flex-row xl:justify-between xl:gap-32">
        <div className="row-center h-[70px] w-80 gap-2 py-8">
          <Image
            src={"/images/chatgpt_logo.png"}
            width={70}
            height={70}
            alt={"chatgpt_logo"}
          />
          <span className="text-4xl font-bold text-main_color">+</span>
          <Image
            src={"/images/bardai.png"}
            width={270}
            height={200}
            alt={"bardai"}
          />
        </div>

        <p>
          ChatGPT는 OpenAI가 제공하는 서비스, Bard는 Google에서 제공하는
          서비스입니다. ChatGPT API와 Bard API는 개발자들이 대화형 인공지능
          모델에 액세스하여 다양한 애플리케이션과 서비스에서 자연어 처리 기능을
          활용할 수 있도록 도와줍니다.
        </p>
      </div>
    </div>
  );
}
