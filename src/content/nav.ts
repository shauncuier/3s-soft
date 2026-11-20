export const mainNav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/portfolio/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Contact', href: '/contact/' },
] as const

export const AUDIT_HREF = '/free-listing-audit/'

/** Pages where the form is the action, so the mobile CTA bar stays hidden. */
export const NO_CTA_BAR = ['/contact/', '/free-listing-audit/']
