import { motion } from "framer-motion";
import { useAppSelector } from "@toolkit/hook";

import Header from "./Header";
import TabBar from "./TabBar";
import Alert from "@components/Alert";

export default function OnePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAlert = useAppSelector((state) => state.alert.isAlert);

  return (
    <>
      {/* 메인 영역 */}
      <div>
        <div className="col-center container mx-auto h-screen w-screen px-4 pb-[70px] pt-20 ">
          {children}
        </div>
      </div>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />

      {/* 알림창 */}
      {isAlert && <Alert />}
    </>
  );
}
