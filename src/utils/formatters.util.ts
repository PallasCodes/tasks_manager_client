export function dateToLocale(date: any): string {
  try {
    return new Date(date).toLocaleString()
  } catch (e) {
    return ''
  }
}
