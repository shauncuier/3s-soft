import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How 3s-Soft collects and uses personal data from enquiries, the free audit form and optional analytics on 3s-soft.com.',
  alternates: { canonical: '/privacy-policy/' },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      path="/privacy-policy/"
      updated="2026-11-21"
      intro="This policy explains what personal data 3s-Soft collects through 3s-soft.com, why, and what you can do about it. 3s-Soft is based in Chittagong, Bangladesh. Contact us at info@3s-soft.com with any privacy question."
      sections={[
        {
          heading: 'What we collect',
          paragraphs: ['We only collect what you choose to send us, plus optional analytics if you allow them.'],
          list: [
            'Contact and audit forms: your name, email, optional WhatsApp number, store or listing URL, marketplace and message.',
            'Campaign tags: if you arrived from one of our links, the utm_ tags in that link are sent with your form so we know which message you replied to.',
            'Analytics, only if you click “Allow analytics”: pages viewed, device type and approximate location through Google Analytics, and anonymised session recordings through Microsoft Clarity.',
          ],
        },
        {
          heading: 'How we use it',
          paragraphs: ['We use form details only to reply to your request, prepare your audit or quote, and do the work you hire us for. We use analytics to see which pages are useful and fix the ones that are not. We do not sell personal data or add you to a mailing list.'],
        },
        {
          heading: 'Who processes it',
          list: [
            'Form submissions go to our own web server at 3s-soft.com and are emailed to our 3s-Soft mailbox. Both run on our hosting provider; no outside form service is involved.',
            'Google Analytics and Microsoft Clarity process analytics data, only after you consent.',
            'Cal.com handles call bookings if you book a call.',
          ],
          paragraphs: [],
        },
        {
          heading: 'How long we keep it',
          paragraphs: ['Enquiries that do not lead to a project are deleted within 12 months. Client project records are kept for as long as needed for the work and our accounts.'],
        },
        {
          heading: 'Your choices',
          paragraphs: ['You can ask us to see, correct or delete the personal data we hold about you by emailing info@3s-soft.com. You can withdraw analytics consent at any time on the [cookie policy page](/cookies/).'],
        },
      ]}
    />
  )
}
