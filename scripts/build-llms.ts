import { writeFileSync } from 'node:fs'
import { renderLlms } from '../src/content/llms'

writeFileSync('public/llms.txt', renderLlms())
console.log('Wrote public/llms.txt from proof.ts.')
