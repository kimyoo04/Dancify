import { motion } from "framer-motion";
import { useAppSelector } from "@toolkit/hook";

import Header from "./Header";
import Footer from "./Footer";
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="col-center container mx-auto h-screen w-screen px-4 pb-[70px] pt-20 ">
          {children}
        </div>
      </motion.div>

      {/* 해더 영역 */}
      <div className="fixed top-0 w-full">
        <Header />
      </div>

      {/* 푸터 영역 */}
      <div className="fixed bottom-0 w-full">
        <Footer />
      </div>

      {/* Alert */}
      {isAlert && <Alert />}
    </>
  );
}
