export default function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((total, num) => total + num, 0);
  const average = sum / numbers.length;
  return Math.round(average * 100) / 100;
}
