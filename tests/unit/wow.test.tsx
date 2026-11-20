import { render, screen, fireEvent, act } from '@testing-library/react'
import { BeforeAfter } from '@/components/wow/BeforeAfter'
import { SearchPill, SEARCHES } from '@/components/wow/SearchPill'
import { MotionToggle } from '@/components/wow/MotionToggle'

function mockReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: reduce && q.includes('reduce'), media: q, addEventListener: vi.fn(), removeEventListener: vi.fn(),
    onchange: null, addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }))
}

beforeEach(() => {
  document.documentElement.removeAttribute('data-motion')
  mockReducedMotion(false)
})

test('before/after toggle switches the listing card between versions', () => {
  render(<BeforeAfter />)
  const before = screen.getByRole('radio', { name: /supplier data/i })
  const after = screen.getByRole('radio', { name: /3s-Soft listing/i })
  expect(after.getAttribute('aria-checked')).toBe('true')
  expect(screen.getByText(/MONTIQUE Striped Pattern Walking Suit/)).toBeTruthy()
  fireEvent.click(before)
  expect(before.getAttribute('aria-checked')).toBe('true')
  expect(screen.getByText(/mens walking suit 2pc/)).toBeTruthy()
})

test('arrow keys move between the two versions', () => {
  render(<BeforeAfter />)
  const after = screen.getByRole('radio', { name: /3s-Soft listing/i })
  fireEvent.keyDown(after, { key: 'ArrowLeft' })
  expect(screen.getByRole('radio', { name: /supplier data/i }).getAttribute('aria-checked')).toBe('true')
})

test('search pill cycles through real buyer searches', () => {
  vi.useFakeTimers()
  render(<SearchPill />)
  // Each typed letter schedules the next timer, so step tick by tick and record completed searches.
  const seen = new Set<string>()
  for (let n = 0; n < 150; n++) {
    act(() => { vi.advanceTimersByTime(100) })
    for (const s of SEARCHES) if (document.body.textContent!.includes(s)) seen.add(s)
  }
  expect(seen.size).toBeGreaterThanOrEqual(2)
  vi.useRealTimers()
})

test('search pill shows a finished search and no animation under reduced motion', () => {
  mockReducedMotion(true)
  render(<SearchPill />)
  expect(document.body.textContent).toContain(SEARCHES[0])
})

test('motion toggle pauses and resumes page animation', () => {
  render(<MotionToggle />)
  const btn = screen.getByRole('button', { name: /pause animation/i })
  fireEvent.click(btn)
  expect(document.documentElement.getAttribute('data-motion')).toBe('paused')
  expect(screen.getByRole('button', { name: /play animation/i }).getAttribute('aria-pressed')).toBe('true')
  fireEvent.click(screen.getByRole('button', { name: /play animation/i }))
  expect(document.documentElement.getAttribute('data-motion')).toBeNull()
})
