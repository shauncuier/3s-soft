import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'The terms that apply when you use 3s-soft.com or hire 3s-Soft directly for listing, catalogue or lead generation work.',
  alternates: { canonical: '/terms-of-service/' },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      path="/terms-of-service/"
      updated="2026-11-20"
      intro="These terms cover use of 3s-soft.com and direct projects with 3s-Soft. Orders placed through Fiverr or Upwork follow that platform’s own terms instead."
      sections={[
        {
          heading: 'Quotes and scope',
          paragraphs: ['Every direct project starts with a written quote that states the deliverables, price and delivery date. Work outside that scope is quoted separately before we start it.'],
        },
        {
          heading: 'Payment',
          paragraphs: ['Payment terms, including any deposit, are stated in the quote. Monthly support plans are billed in advance for each month.'],
        },
        {
          heading: 'Your accounts and content',
          paragraphs: ['You stay the owner of your seller accounts, products, images and brand. You grant us the access the job needs and can remove it at any time. Listings and content we create for you are yours once the project is paid.'],
        },
        {
          heading: 'Marketplace rules',
          paragraphs: ['We follow each marketplace’s published listing policies, but Amazon, Walmart, Shopify, Etsy and eBay make the final decision on what they accept, rank or suppress. We cannot promise rankings or sales results.'],
        },
        {
          heading: 'Confidentiality',
          paragraphs: ['We keep your account details, product data and business information confidential. We only show your project in our portfolio with your permission.'],
        },
        {
          heading: 'Free audit',
          paragraphs: ['The free 5-product listing audit has no cost and no obligation. You can use the notes however you like.'],
        },
        {
          heading: 'Contact',
          paragraphs: ['Questions about these terms: info@3s-soft.com.'],
        },
      ]}
    />
  )
}
