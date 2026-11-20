const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

/** "2026-11-20" → "Nov 2026". Fixed locale and time zone so server and client render the same text. */
export function formatCheckedOn(isoDate: string): string {
  return monthYear.format(new Date(`${isoDate}T00:00:00Z`))
}

const fullDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

/** "2026-11-20" → "20 November 2026". */
export function formatDate(isoDate: string): string {
  return fullDate.format(new Date(`${isoDate}T00:00:00Z`))
}

export function sourceName(url: string): string {
  if (url.includes('fiverr.com')) return 'Fiverr'
  if (url.includes('upwork.com')) return 'Upwork'
  if (url.includes('wordpress.org')) return 'WordPress.org'
  if (url.includes('amazon.com')) return 'Amazon SPN'
  return new URL(url).hostname
}
