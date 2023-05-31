import { motion } from "framer-motion";

import Header from "@layouts/Header";
import Footer from "@layouts/Footer";
import Alert from "@components/Alert";
import { useAppSelector } from "@toolkit/hook";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAlert = useAppSelector((state) => state.alert.isAlert);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="col-center h-screen w-screen">{children}</div>
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
