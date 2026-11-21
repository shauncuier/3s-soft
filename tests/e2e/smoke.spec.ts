import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

const urls = [...readFileSync('out/sitemap.xml', 'utf8').matchAll(/<loc>https:\/\/3s-soft\.com(\/[^<]*)<\/loc>/g)].map((m) => m[1])

test('sitemap has every page', () => {
  expect(urls.length).toBe(30) // 12 static + 5 services + 7 case studies + 6 guides
})

for (const path of urls) {
  test(`${path} loads with a title, one h1 and a canonical`, async ({ page }) => {
    const res = await page.goto(path)
    expect(res?.status()).toBe(200)
    await expect(page).toHaveTitle(/3s-Soft/)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://3s-soft.com${path}`)
  })
}
