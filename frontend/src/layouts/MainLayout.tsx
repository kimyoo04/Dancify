import Header from "./Header";
import Footer from "./Footer";
import TabBar from "./TabBar";

export default function MainLayout({
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
      <Header />
      <TabBar />
    </>
  );
}
