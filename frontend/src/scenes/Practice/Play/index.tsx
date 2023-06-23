export default function Play({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1 onClick={onNext}>Play</h1>
    </div>
  );
}
