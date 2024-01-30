export function numberToDate(number: number): Date {
  return new Date(number * 1000);
}

export function numberToDateString(number: number): string {
  return numberToDate(number).toISOString();
}
