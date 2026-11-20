import { test, expect } from '@playwright/test'

test('reviews page shows both Fiverr and Upwork sections', async ({ page }) => {
  await page.goto('/reviews/')
  await expect(page.getByRole('heading', { level: 2, name: 'Fiverr reviews' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 2, name: 'Upwork reviews' })).toBeVisible()
  await expect(page.getByText('Fouad L.')).toBeVisible()
  await expect(page.getByText('Place pictures into mockups').first()).toBeVisible()
})

test('booking buttons use the site’s own Cal.com event', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('a[href="https://cal.com/3s-soft/listing-call"]').first()).toHaveCount(1)
  expect(await page.locator('a[href*="cal.com/3s-soft-uk"]').count()).toBe(0)
})
