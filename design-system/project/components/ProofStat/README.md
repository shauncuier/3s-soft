# ProofStat

A ProofStat shows a number someone can verify, with its label and a link to the place where they can check it. `ProofBar` lays several of them out in a `green-100` band.

- **Consumer provides:** a proof id from `content/proof.ts`. The component reads `value`, `label`, `sourceUrl` and `checkedOn` from that file. Nothing is typed by hand.
- **Type:**
  - value: `numeral` (Archivo expanded, `brand-charcoal`, tabular figures)
  - label: `body-strong`
  - source stamp: `mono` in `ink-muted`
- **Star:** only the rating gets a `★` in `star`, and the number is always shown with it.
- **Rendering:** plain text in the HTML. No count-up animation and no `0+` placeholder.
- **Values allowed today:**
  - 5.0 rating
  - 465 reviews
  - Upwork Top Rated, 100% Job Success, 55 jobs
  - Amazon SPN (A+ and Cataloguing)
  - WordPress.org plugin
  - since 2015
- **Don't:** round numbers up, add "+" to exact counts, or show a stat without its source link.
