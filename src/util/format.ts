export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
}
