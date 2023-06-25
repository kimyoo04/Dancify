export default function StandByModal({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="col-center h-full w-full px-10 sm:px-20">
      <div className="h-[80%] w-full rounded-md bg-background p-6 shadow-md sm:w-[440px]">
        {children}
      </div>
    </div>
  );
}
