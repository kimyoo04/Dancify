import Image from "next/image";

export default function Introduce() {
  return (
    <div className="col-center py-8">
      <div className="flex w-full border-b pb-2">
        <h1 className="text-2xl font-medium">About us</h1>
      </div>

      <div className="flex w-full items-start justify-start gap-4 py-8">
        <div>
          <p>
            안녕하세요! 수어 번역 서비스에 오신 것을 환영합니다! 우리는 ChatGPT
            API, Bard API를 활용하여 수어 번역 서비스를 제공합니다. 수어 번역
            서비스는 장애인, 외국인, 혹은 수어를 모르는 사람들에게 유용하며,
            의사소통의 장벽을 허물고 보다 편리한 세상을 만들기 위해 노력하고
            있습니다. 우리 서비스는 아직 개발 중이지만, 많은 분들의 관심과
            이용을 바라며, 세상을 더 나은 곳으로 만드는 데 도움이 되기를
            바랍니다.
          </p>
        </div>

        <div className="flex w-full justify-end">
          <a
            href="https://github.com/kimyoo04/signlanguage-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={"/images/github.png"}
              width={80}
              height={80}
              alt={"bardai"}
              className="transition-all hover:scale-110"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
