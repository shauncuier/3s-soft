import { build } from 'esbuild'

await build({
  entryPoints: ['src/client/index.ts'],
  outfile: 'public/assets/site.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  legalComments: 'none',
})
console.log('Wrote public/assets/site.js')
