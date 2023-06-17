import Header from "./Header";
import Footer from "./Footer";
import TabBar from "./TabBar";
import Navigation from "./SideBar/Navigation";
import { useAppSelector } from "@toolkit/hook";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = useAppSelector((state) => state.sideBar.isOpen);
  const paddingleft = isOpen ? "md:pl-[200px]" : "md:pl-[72px]";

  return (
    <>
      {/* 메인 영역 */}
      <div className={`row-start overflow-hidden`}>
        {/* 사이드바 영역 */}
        <Navigation />

        {/* 콘텐츠 영역 */}
        <main className={`w-full bg-background pt-[56px] ${paddingleft}`}>
          <div className="p-6"> {children}</div>
          <Footer />
        </main>
      </div>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />
    </>
  );
}
