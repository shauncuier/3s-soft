import { renderTokensCss } from '../../scripts/build-tokens'
import tokens from '../../design-system/project/tokens.json'

const css = renderTokensCss(tokens)

test('light values sit on :root', () => {
  expect(css).toMatch(/:root\s*{[^}]*--green-700:\s*#1f7a39/)
})

test('dark values apply under prefers-color-scheme unless light is forced', () => {
  expect(css).toContain('@media (prefers-color-scheme: dark)')
  expect(css).toMatch(/:root:not\(\[data-theme="light"\]\)\s*{[^}]*--green-700:\s*#4cc46b/)
})

test('explicit dark theme repeats dark values', () => {
  expect(css).toMatch(/:root\[data-theme="dark"\]\s*{[^}]*color-scheme:\s*dark/)
})

test('non-colour tokens are emitted once', () => {
  expect(css).toContain('--space-4: 16px')
  expect(css).toContain('--radius-lg: 16px')
  expect(css).toContain('--z-cta-bar: 50')
  expect(css).toContain('--tap-min: 44px')
})

test('shadows follow the theme', () => {
  expect(css).toMatch(/:root\s*{[^}]*--shadow-bar:\s*0 -4px 20px rgba\(36,33,42,0.10\)/)
})
