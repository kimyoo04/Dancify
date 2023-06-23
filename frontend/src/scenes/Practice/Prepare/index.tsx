export default function Prepare({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1 onClick={onNext}>Prepare</h1>
    </div>
  );
}
