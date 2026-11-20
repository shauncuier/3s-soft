import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const PAGES = [
  '/',
  '/services/',
  '/services/ecommerce-product-listing/',
  '/services/amazon-a-plus-content/',
  '/services/shopify-store-management/',
  '/services/lead-generation/',
  '/services/virtual-assistant/',
  '/portfolio/',
  '/portfolio/ivan-troy-amazon-a-plus/',
  '/portfolio/montique-amazon-store/',
  '/portfolio/stahl-design-tebart-amazon-listing-optimization/',
  '/portfolio/party-supplies-amazon-catalogue/',
  '/portfolio/tailwater-supply/',
  '/reviews/',
  '/about-us/',
  '/team/',
  '/blogs/',
  '/blog/ecommerce-product-optimization-conversions/',
  '/blog/amazon-global-selling-strategies-uk-us/',
  '/contact/',
  '/free-listing-audit/',
  '/privacy-policy/',
  '/terms-of-service/',
  '/cookies/',
  '/this-page-does-not-exist/',
]

for (const path of PAGES) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${path} has no serious axe violations (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto(path)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([])
      expect(await page.locator('h1').count()).toBe(1)
    })
  }
}
