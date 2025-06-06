export function fibonacci(n): number[] {
  const fib = [0, 1];
  for (let i = 2; i < n + 2; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.slice(2);
}
