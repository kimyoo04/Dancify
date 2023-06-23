export default function Config({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h1 onClick={onNext}>Config</h1>
    </div>
  );
}
