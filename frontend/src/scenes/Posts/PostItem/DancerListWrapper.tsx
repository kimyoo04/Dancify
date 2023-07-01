export default function DancerListWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="grid w-full grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {children}
    </ul>
  );
}
