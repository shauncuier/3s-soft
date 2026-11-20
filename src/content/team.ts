import { site } from './site'

export type TeamMember = {
  slug: string
  name: string
  role: string
  bio: string
  photo?: { src: string; alt: string }
  links: { label: string; url: string }[]
  location?: string
  isFounder?: boolean
}

const photo = (file: string, name: string) => ({ src: `/assets/team-profile/${file}`, alt: `Portrait of ${name}` })

/** Real, current team. Links only where a public profile exists. Owner open item: real photo for Mehedi Hasan Akash. */
export const team: TeamMember[] = [
  {
    slug: 'jashedul-islam-shaun', name: 'Jashedul Islam Shaun', role: 'Founder & lead', isFounder: true, location: 'Chittagong, Bangladesh',
    bio: 'Has run eCommerce listing, catalogue and lead generation projects on Fiverr since 2015 and leads every client project. Full-stack developer and author of the 3S Soft Price & Stock Sync plugin for WooCommerce.',
    photo: photo('Jashedul_Islam_Shaun.webp', 'Jashedul Islam Shaun'),
    links: [
      { label: 'LinkedIn', url: site.founder.linkedin },
      { label: 'GitHub', url: site.founder.github },
      { label: 'Website', url: site.founder.url },
    ],
  },
  {
    slug: 'minhajul-abedin-toyon', name: 'Minhajul Abedin Toyon', role: 'UK Director', location: 'United Kingdom',
    bio: 'Looks after client relationships and project coordination for UK businesses through 3s-Soft UK.',
    photo: photo('Minhajul_Abedin.webp', 'Minhajul Abedin Toyon'),
    links: [{ label: '3s-soft.co.uk', url: site.ukUrl }],
  },
  {
    slug: 'oahidul-islam-sajib', name: 'Oahidul Islam Sajib', role: 'Co-founder & creative director',
    bio: 'Leads design and brand work, including image modules and graphics for client listings.',
    photo: photo('Oahidul_Islam_Sajib.webp', 'Oahidul Islam Sajib'), links: [],
  },
  {
    slug: 'rakibul-hasan', name: 'Rakibul Hasan', role: 'Senior front-end developer',
    bio: 'Builds the front end of client websites and web apps.',
    photo: photo('Rakibul_Hasan.webp', 'Rakibul Hasan'),
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mrakibulhasan/' },
      { label: 'GitHub', url: 'https://github.com/rhakib' },
    ],
  },
  {
    slug: 'maptaul-islam-taraq', name: 'Maptaul Islam Taraq', role: 'Full-stack developer',
    bio: 'Builds web apps and store integrations with React, Node.js and MongoDB.',
    photo: photo('Maptaul_Islam_Taraq.webp', 'Maptaul Islam Taraq'),
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/maptaul/' },
      { label: 'GitHub', url: 'https://github.com/Maptaul' },
    ],
  },
  {
    slug: 'borhan-siddque', name: 'Borhan Siddque', role: 'Front-end developer',
    bio: 'Builds responsive, accessible interfaces for client sites.',
    photo: photo('Borhan_Siddque.webp', 'Borhan Siddque'),
    links: [
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/borhan-siddque/' },
      { label: 'GitHub', url: 'https://github.com/borhansiddque' },
      { label: 'Portfolio', url: 'https://borhansiddque.netlify.app/' },
    ],
  },
  {
    slug: 'md-shahidul-islam', name: 'Md. Shahidul Islam', role: 'Digital marketing specialist',
    bio: 'Works on SEO and social media for client brands.',
    photo: photo('Shamim.webp', 'Md. Shahidul Islam'), links: [],
  },
  {
    slug: 'mehedi-hasan-akash', name: 'Mehedi Hasan Akash', role: 'UI/UX & graphic designer',
    bio: 'Designs interfaces and marketing graphics.',
    links: [],
  },
  {
    slug: 'fariya-rahman', name: 'Fariya Rahman', role: 'Data entry specialist',
    bio: 'Handles catalogue data, supplier sheets and Google Sheets work for client stores.',
    photo: photo('fariya.webp', 'Fariya Rahman'), links: [],
  },
]
