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
      <div>
        <div className="col-center container h-screen w-full">{children}</div>
      </div>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />

      {/* 알림창 */}
      {isAlert && <Alert />}
    </>
  );
}
