import { test, expect } from '@playwright/test'

test.use({ viewport: { width: 320, height: 640 } })

for (const path of ['/', '/services/ecommerce-product-listing/', '/portfolio/praktan-sabujian-parishad/', '/contact/', '/free-listing-audit/', '/reviews/']) {
  test(`${path} has no sideways scroll at 320px`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('3s-consent', 'denied'))
    await page.goto(path)
    const width = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(width).toBeLessThanOrEqual(320)
  })
}

for (const path of ['/', '/services/amazon-a-plus-content/']) {
  test(`${path}: the sticky CTA bar never covers a focused link`, async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('3s-consent', 'denied'))
    await page.goto(path)
    const bar = page.getByTestId('mobile-cta-bar')
    await expect(bar).toBeVisible()
    const footerLink = page.locator('footer a').last()
    await footerLink.focus()
    const [l, b] = await Promise.all([footerLink.boundingBox(), bar.boundingBox()])
    expect(l!.y + l!.height).toBeLessThanOrEqual(b!.y)
  })
}

test('audit form submit button is not hidden behind anything on a small phone', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('3s-consent', 'denied'))
  await page.goto('/free-listing-audit/')
  await expect(page.getByTestId('mobile-cta-bar')).toBeHidden()
  const submit = page.getByRole('button', { name: /send my audit request/i })
  await submit.scrollIntoViewIfNeeded()
  await expect(submit).toBeInViewport()
})
