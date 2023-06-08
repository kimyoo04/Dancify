import { useAppSelector } from "@toolkit/hook";

import Header from "./Header";
import Footer from "./Footer";
import TabBar from "./TabBar";
import Alert from "@components/Alert";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAlert = useAppSelector((state) => state.alert.isAlert);
  return (
    <>
      {/* 메인 영역 */}
      <main>
        <div className="col-center pb-20 pt-20 md:pb-0">
          {children}
          <Footer />
        </div>
      </main>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />

      {/* 알림창 */}
      {isAlert && <Alert />}
    </>
  );
}
