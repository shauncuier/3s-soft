import Link from 'next/link'
import { parseInline } from '@/lib/inline'

export function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((t, i) => {
        if (t.type === 'text') return <span key={i}>{t.value}</span>
        const cls = 'font-semibold text-green-700 underline underline-offset-2 hover:text-green-800'
        return t.external ? (
          <a key={i} className={cls} href={t.href} target="_blank" rel="noopener">{t.text}</a>
        ) : (
          <Link key={i} className={cls} href={t.href}>{t.text}</Link>
        )
      })}
    </>
  )
}
