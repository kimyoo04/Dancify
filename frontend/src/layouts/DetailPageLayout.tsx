import DetailHeader from "./DetailHeader";
import Footer from "./Footer";
import TabBar from "./TabBar";

export default function DetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 메인 영역 */}
      <main>
        <div className="col-center container pb-20 pt-20 md:pb-0">
          {children}
          <Footer />
        </div>
      </main>

      {/* 레이아웃 요소 */}
      <DetailHeader />
      <TabBar />
    </>
  );
}
