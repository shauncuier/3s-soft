import { test, expect } from '@playwright/test'

const TRACKERS = /googletagmanager\.com|clarity\.ms/

test('declining analytics loads no trackers, even after reload', async ({ page }) => {
  const hits: string[] = []
  page.on('request', (r) => { if (TRACKERS.test(r.url())) hits.push(r.url()) })

  await page.goto('/')
  await page.getByRole('button', { name: 'Decline' }).click()
  await page.reload()
  await page.waitForLoadState('networkidle')

  expect(hits).toEqual([])
  await expect(page.getByRole('button', { name: 'Decline' })).toHaveCount(0)
})

test('allowing analytics loads Google Analytics', async ({ page }) => {
  await page.goto('/')
  const gtm = page.waitForRequest((r) => r.url().includes('googletagmanager.com'))
  await page.getByRole('button', { name: 'Allow analytics' }).click()
  await gtm
})

test('skip link jumps to main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to main content' })
  await expect(skip).toBeFocused()
  await expect(page.locator('main#main')).toHaveCount(1)
})
