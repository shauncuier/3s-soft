'use client'

import { useState } from 'react'
import { Pause, Play } from 'lucide-react'

/** Pauses every looping animation on the page (marquee, work wall, floating tiles). WCAG 2.2.2 Pause, Stop, Hide. */
export function MotionToggle({ className = '' }: { className?: string }) {
  const [paused, setPaused] = useState(false)
  const toggle = () => {
    const next = !paused
    setPaused(next)
    if (next) document.documentElement.setAttribute('data-motion', 'paused')
    else document.documentElement.removeAttribute('data-motion')
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface-0 px-3 text-sm font-semibold text-ink hover:border-ink ${className}`}
    >
      {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      <span>{paused ? 'Play animation' : 'Pause animation'}</span>
    </button>
  )
}
