import Image from "next/image";

export default function SignLanguageIntro() {
  return (
    <div className="col-center py-8">
      <div className="flex w-full border-b pb-2">
        <h1 className="text-2xl font-medium">수화 번역 서비스</h1>
      </div>

      <div className="flex w-full flex-col items-center justify-center py-8">
        <div className="flex w-full flex-col items-center">
          <p>4조의 수어 번역 서비스는 혁신적인 방식을 사용합니다.</p>
          <p>▶ 이미지를 입력하면 mlflow의 모델을 통해 알파벳을 인식합니다.</p>
          <p>
            ▶ 알파벳에 대한 정보를 ChatGPT API와 BARD API로 전송하여 답변을 받을
            수 있습니다.
          </p>
          <p>
            이 서비스는 수어 사용자들에게 효과적인 의사 소통 도구로 사용될 수
            있습니다.
          </p>
        </div>

        <div className="pt-8">
          <Image
            src={"/images/수어번역서비스 모델 설명.png"}
            width={1024}
            height={1024}
            alt={"수어번역서비스 모델 설명"}
            className="w-full"
          />

          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-start justify-center rounded-lg border p-3">
              <span className="text-center text-sm">
                1. 수어 이미지 파일 업로드
              </span>
            </div>
            <div className="flex items-start justify-center rounded-lg border p-3">
              <span className="text-center text-sm">
                2. CNN 모델을 통한 이미지 분류 mlflow : 머신러닝 프로젝트의
                생명주기 관리를 위한 오픈 소스 플랫폼
              </span>
            </div>
            <div className="flex items-start justify-center rounded-lg border p-3">
              <span className="text-center text-sm">
                3.ChatGPT API, BARD API 응답 요청
              </span>
            </div>
            <div className="flex items-start justify-center rounded-lg border p-3">
              <span className="text-center text-sm">
                4. 응답 결과 사용자에게 전송
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
