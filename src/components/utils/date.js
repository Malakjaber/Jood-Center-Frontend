export function compareDates(date1, date2) {
  return (
    date1.getDay() === date2.getDay() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
