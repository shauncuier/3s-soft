import { render, screen, within } from '@testing-library/react'
import { ProofStat } from '@/components/ProofStat'
import { ProofBar } from '@/components/ProofBar'
import { ReviewCard } from '@/components/ReviewCard'
import { reviews } from '@/content/reviews'

test('ProofStat shows the value, label and a link to its source', () => {
  const { container } = render(<ProofStat id="fiverr-reviews" />)
  expect(container.textContent).toContain('465')
  expect(container.textContent).not.toContain('0+')
  const link = screen.getByRole('link')
  expect(link).toHaveProperty('href', 'https://www.fiverr.com/jashedulislam')
  expect(link.getAttribute('rel')).toContain('noopener')
  expect(link.textContent).toMatch(/checked Nov 2026/)
})

test('only the rating gets a star', () => {
  const { container: rating } = render(<ProofStat id="fiverr-rating" />)
  expect(rating.textContent).toContain('★')
  const { container: count } = render(<ProofStat id="fiverr-reviews" />)
  expect(count.textContent).not.toContain('★')
})

test('ProofBar renders one stat per id, in order', () => {
  render(<ProofBar ids={['fiverr-rating', 'fiverr-reviews', 'upwork-jss']} />)
  const items = screen.getAllByRole('listitem')
  expect(items).toHaveLength(3)
  expect(items[2].textContent).toContain('100%')
})

test('ReviewCard quotes verbatim and links to the source', () => {
  const review = reviews.find((r) => r.id === 'cromwelltoby-listings')!
  render(<ReviewCard review={review} />)
  const fig = screen.getByRole('figure')
  expect(within(fig).getByText(/He was very quick in getting my listings created for me\./)).toBeTruthy()
  expect(within(fig).getByText('cromwelltoby')).toBeTruthy()
  expect(within(fig).getByRole('link')).toHaveProperty('href', review.sourceUrl)
  expect(within(fig).getByLabelText('Rated 5 out of 5')).toBeTruthy()
})
