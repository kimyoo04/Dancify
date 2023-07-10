import Header from "@layouts/Header";
import TabBar from "@layouts/TabBar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>
        <div className="col-center container min-h-screen w-full py-24">{children}</div>
      </main>

      {/* 레이아웃 요소 */}
      <Header />
      <TabBar />
    </>
  );
}
