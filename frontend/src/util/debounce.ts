export default function debounce<F extends (...args: any[]) => any, T>(
  func: F,
  delay: number
): (this: T, ...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout;
  return function debouncedFunction(this: T, ...args: Parameters<F>): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
