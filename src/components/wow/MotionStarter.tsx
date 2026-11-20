'use client'

import { useEffect } from 'react'

/**
 * Keeps looping animations off during page load (protects Total Blocking Time),
 * turns them on once the page is loaded and idle, and only runs them while their section is on screen.
 * Never turns them on under prefers-reduced-motion.
 */
export function MotionStarter({ delay = 1500 }: { delay?: number }) {
  useEffect(() => {
    const root = document.documentElement
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.toggleAttribute('data-inview', e.isIntersecting)
    }, { rootMargin: '100px' })
    document.querySelectorAll('.motion-group').forEach((el) => io.observe(el))

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return () => io.disconnect()

    let timer: ReturnType<typeof setTimeout> | undefined
    const start = () => { timer = setTimeout(() => root.setAttribute('data-anim', 'on'), delay) }
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    return () => {
      io.disconnect()
      window.removeEventListener('load', start)
      if (timer) clearTimeout(timer)
    }
  }, [delay])
  return null
}
