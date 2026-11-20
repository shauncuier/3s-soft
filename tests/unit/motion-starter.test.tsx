import { render, act } from '@testing-library/react'
import { MotionStarter } from '@/components/wow/MotionStarter'

type IOCallback = (entries: { target: Element; isIntersecting: boolean }[]) => void
let ioCallback: IOCallback | null = null

beforeEach(() => {
  document.documentElement.removeAttribute('data-anim')
  ioCallback = null
  ;(window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
    constructor(cb: IOCallback) { ioCallback = cb }
    observe() {}
    disconnect() {}
  }
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({ matches: false, media: q, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
})

test('loops stay off until the page has loaded and gone idle', () => {
  vi.useFakeTimers()
  render(<MotionStarter delay={1500} />)
  expect(document.documentElement.getAttribute('data-anim')).toBeNull()
  act(() => { window.dispatchEvent(new Event('load')); vi.advanceTimersByTime(1600) })
  expect(document.documentElement.getAttribute('data-anim')).toBe('on')
  vi.useRealTimers()
})

test('groups are marked in view only while visible', () => {
  const group = document.createElement('div')
  group.className = 'motion-group'
  document.body.appendChild(group)
  render(<MotionStarter delay={0} />)
  act(() => ioCallback!([{ target: group, isIntersecting: true }]))
  expect(group.hasAttribute('data-inview')).toBe(true)
  act(() => ioCallback!([{ target: group, isIntersecting: false }]))
  expect(group.hasAttribute('data-inview')).toBe(false)
  group.remove()
})

test('reduced motion never turns loops on', () => {
  vi.useFakeTimers()
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({ matches: q.includes('reduce'), media: q, addEventListener: vi.fn(), removeEventListener: vi.fn() }))
  render(<MotionStarter delay={0} />)
  act(() => { window.dispatchEvent(new Event('load')); vi.advanceTimersByTime(100) })
  expect(document.documentElement.getAttribute('data-anim')).toBeNull()
  vi.useRealTimers()
})
