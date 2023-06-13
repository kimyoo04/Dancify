import Header from "./Header";
import TabBar from "./TabBar";

export default function OnePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 메인 영역 */}
      <div>
        <div className="col-center container mx-auto h-screen w-screen pb-[70px] pt-20 ">
          {children}
        </div>
      </div>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />
    </>
  );
}
