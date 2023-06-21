export default function PostMore({
  inViewRef,
  hasNextPage,
}: {
  inViewRef: (node?: Element | null | undefined) => void;
  hasNextPage: boolean | undefined;
}) {
  return (
    <div
      ref={inViewRef}
      className={`col-center ${hasNextPage && "border-accent"} w-full`}
    >
      <div className="rounded-full border px-4 py-1">
        {hasNextPage ? (
          <span className="text-primary logo">▶ancify</span>
        ) : (
          <span className="text-muted-foreground logo">▶ancify</span>
        )}
      </div>
    </div>
  );
}
