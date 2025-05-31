export function formatNumber(value: number): string {
  if (value > 1e15) {
    return (value / 1e15).toFixed(1) + 'Q'; // Quadrillions
  } else if (value >= 1e12) {
    return (value / 1e12).toFixed(1) + 'T'; // Trillions
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + 'B'; // Billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + 'M'; // Millions
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'K'; // Thousands
  } else {
    return value.toString(); // Less than a thousand
  }
}
