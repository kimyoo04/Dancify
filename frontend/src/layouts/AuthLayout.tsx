import Header from "@layouts/Header";
import TabBar from "@layouts/TabBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <div className="col-center container h-screen w-full">{children}</div>
      </div>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />
    </>
  );
}
