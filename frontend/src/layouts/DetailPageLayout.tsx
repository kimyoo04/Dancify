import { useAppSelector } from "@toolkit/hook";

import Header from "./Header";
import Footer from "./Footer";
import TabBar from "./TabBar";
import Alert from "@components/Alert";

export default function DetailPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAlert = useAppSelector((state) => state.alert.isAlert);
  return (
    <>
      {/* 메인 영역 */}
      <div>
        <div className="ol-center container mx-auto px-0 pt-20 md:px-4">
          {children}
        </div>
      </div>

      {/* 레이아웃 요소 */}
      <Header />
      <Footer />
      <TabBar />

      {/* 알림창 */}
      {isAlert && <Alert />}
    </>
  );
}
