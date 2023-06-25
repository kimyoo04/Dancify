export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="col-center min-h-screen w-screen bg-muted pb-[7%]">
      {children}
    </div>
  );
}
