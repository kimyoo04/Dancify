export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="col-center min-h-screen w-screen bg-slate-100 dark:bg-slate-100 pb-[60px]">
      {children}
    </div>
  );
}
