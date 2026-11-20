import { proof, validateProof } from '../src/content/proof'
import { reviews, validateReviews } from '../src/content/reviews'

const errors = [...validateProof(proof), ...validateReviews(reviews)]

if (errors.length > 0) {
  console.error('Proof check failed. Every number and review needs an https sourceUrl and a YYYY-MM-DD checkedOn:')
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log(`Proof check passed: ${proof.length} proof items, ${reviews.length} reviews.`)
