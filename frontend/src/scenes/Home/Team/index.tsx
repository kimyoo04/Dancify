import Image from "next/image";

export default function Team() {
  return (
    <div className="col-center py-8">
      <div className="flex w-full border-b pb-2">
        <h1 className="text-2xl font-medium">팀 소개</h1>
      </div>

      <div className="col-center w-full py-8">
        <h2 className="pb-8 text-xl font-medium">Aivle School 4조</h2>
        <div className="grid w-full gap-3 md:grid-cols-3 lg:px-12">
          <div className="col-center gap-5 rounded-xl border p-8">
            {/* 역할 명칭 */}
            <h2 className="text-lg font-medium">Frond-end</h2>

            {/* 역할 아이콘 */}
            <div>
              <Image
                src={"/images/frontend.png"}
                width={100}
                height={100}
                alt={"frontend"}
              />
            </div>

            {/* 팀원 이름 */}
            <span className="py-2">
              <b className="font-medium">김 유</b>
            </span>
          </div>
          <div className="col-center gap-5 rounded-xl border p-8">
            {/* 역할 명칭 */}
            <h2 className="text-lg font-medium">Back-end</h2>

            {/* 역할 아이콘 */}
            <div>
              <Image
                src={"/images/backend.png"}
                width={100}
                height={100}
                alt={"backend"}
              />
            </div>

            {/* 팀원 이름 */}
            <span className="py-2">
              <b className="font-medium">박수민</b>, 장 혁, 조해민
            </span>
          </div>
          <div className="col-center gap-5 rounded-xl border p-8">
            {/* 역할 명칭 */}
            <h2 className="text-lg font-medium">AI, UI/UX</h2>

            {/* 역할 아이콘 */}
            <div className="row-center">
              <Image
                src={"/images/ai_icon.png"}
                width={100}
                height={100}
                alt={"ai_icon"}
              />
              <Image
                src={"/images/ux_ui.png"}
                width={100}
                height={100}
                alt={"ux_ui"}
              />
            </div>

            {/* 팀원 이름 */}
            <div className="col-center py-2">
              <span>
                <b className="font-medium">김 유, </b>
                <b className="font-medium">박희원, </b>
              </span>
              <span className="md:inline-block">원유준, 이찬솔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
