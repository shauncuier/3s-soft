import type { SiteConfig } from './types'

export const site: SiteConfig = {
  name: '3s-Soft',
  legalName: '3s-Soft',
  url: 'https://3s-soft.com',
  email: 'info@3s-soft.com',
  phone: '+880 1835 927634',
  phoneHref: 'tel:+8801835927634',
  whatsapp: 'https://wa.me/8801835927634',
  // Owner open item 2: replace with a .com booking link when one exists.
  bookingUrl: 'https://cal.com/3s-soft-uk/15min',
  fiverrUrl: 'https://www.fiverr.com/jashedulislam',
  upworkUrl: 'https://www.upwork.com/freelancers/~01c75e88b6540d813f',
  upworkAgencyUrl: 'https://www.upwork.com/agencies/2093425202844360561/',
  wordpressPluginUrl: 'https://wordpress.org/plugins/3s-soft-price-stock-sync-for-dropshipzone/',
  amazonSpnAplusUrl:
    'https://sellercentral.amazon.com/gspn/provider-details/Enhanced%20Brand%20Content/d0034058-2c31-4502-87f9-c29514841f24?localeSelection=en_US&sellFrom=US&sellIn=US',
  amazonSpnCatalogUrl:
    'https://sellercentral.amazon.com/gspn/provider-details/Cataloguing/d0034058-2c31-4502-87f9-c29514841f24?localeSelection=en_US&sellFrom=US&sellIn=US',
  ukUrl: 'https://3s-soft.co.uk',
  netUrl: 'https://3s-soft.net',
  founder: {
    name: 'Jashedul Islam Shaun',
    url: 'https://jashedulislamshaun.com',
    linkedin: 'https://www.linkedin.com/in/jashedulislamshaun',
    github: 'https://github.com/shauncuier',
  },
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/3s-soft' },
    { label: 'Facebook', url: 'https://www.facebook.com/3s.soft.bd' },
    { label: 'Instagram', url: 'https://www.instagram.com/3ssoft' },
  ],
  address: { city: 'Chittagong', country: 'Bangladesh' },
  foundingYear: 2015,
}

/** WhatsApp link with a prefilled first message. */
export function whatsappLink(message = "Hi 3s-Soft, I'd like help with my store listings."): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`
}
