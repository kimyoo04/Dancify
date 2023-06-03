import { motion } from "framer-motion";

import Header from "@layouts/Header";
import TabBar from "@layouts/TabBar";
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

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />

      {/* 알림창 */}
      {isAlert && <Alert />}
    </>
  );
}
