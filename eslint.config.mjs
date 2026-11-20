import next from 'eslint-config-next'

const config = [
  { ignores: ['.next/**', 'out/**', 'design-system/**', 'docs/**', 'node_modules/**', 'test-results/**', 'playwright-report/**'] },
  ...next,
]

export default config
