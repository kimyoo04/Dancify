export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="col-center h-screen w-screen">{children}</div>
  );
}
