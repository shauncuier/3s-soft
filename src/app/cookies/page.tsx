import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { ConsentReset } from '@/components/ConsentReset'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description: 'Which cookies and browser storage 3s-soft.com uses, and how to allow or decline analytics cookies.',
  alternates: { canonical: '/cookies/' },
}

export default function CookiesPage() {
  return (
    <>
      <LegalPage
        title="Cookie policy"
        path="/cookies/"
        updated="2026-11-20"
        intro="3s-soft.com works without cookies. Analytics cookies are set only if you choose “Allow analytics” in the banner."
        sections={[
          {
            heading: 'Always on (no cookies)',
            paragraphs: ['We store two small values in your browser so the site remembers your choices. They are not sent to anyone.'],
            list: ['3s-consent (local storage): your analytics choice.', '3s-utm (session storage): the campaign tags from the link you used, cleared when you close the tab.'],
          },
          {
            heading: 'Only with your consent',
            paragraphs: [],
            list: [
              'Google Analytics (_ga, _ga_*): counts visits and pages viewed. Kept up to 2 years.',
              'Microsoft Clarity (_clck, _clsk, CLID): anonymised heatmaps and session recordings. Kept up to 1 year.',
            ],
          },
          {
            heading: 'Change your choice',
            paragraphs: ['Use the button below to clear your choice. The banner appears again so you can decide afresh. Read more in our [privacy policy](/privacy-policy/).'],
          },
        ]}
      />
      <div className="container-site -mt-8 max-w-3xl pb-16"><ConsentReset /></div>
    </>
  )
}
