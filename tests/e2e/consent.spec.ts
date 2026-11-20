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

test('on a first visit at 320px the cookie banner never hides the focused link', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  await page.goto('/')
  const banner = page.getByRole('region', { name: 'Cookie choice' })
  await expect(banner).toBeVisible()
  const last = page.locator('footer a').last()
  await last.focus()
  const link = (await last.boundingBox())!
  const bar = (await banner.boundingBox())!
  expect(link.y + link.height).toBeLessThanOrEqual(bar.y)
})

test('withdrawing consent stops trackers and removes their cookies', async ({ page, context }) => {
  await page.goto('/')
  const gtm = page.waitForRequest((r) => r.url().includes('googletagmanager.com'))
  await page.getByRole('button', { name: 'Allow analytics' }).click()
  await gtm
  await context.addCookies([{ name: '_ga', value: 'GA1.1.1', url: page.url() }])
  await page.goto('/cookies/')
  const hits: string[] = []
  page.on('request', (r) => { if (TRACKERS.test(r.url())) hits.push(r.url()) })
  await page.getByRole('button', { name: /change my cookie choice/i }).click()
  await Promise.all([page.waitForEvent('load'), page.getByRole('button', { name: 'Decline' }).click()])
  await page.waitForLoadState('networkidle')
  hits.length = 0
  await page.goto('/services/')
  await page.waitForLoadState('networkidle')
  expect(hits).toEqual([])
  expect((await context.cookies()).map((c) => c.name)).not.toContain('_ga')
})
