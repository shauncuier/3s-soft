# ReviewCard

A ReviewCard quotes a real buyer review word for word, shows who wrote it, and links to the original.

- **Consumer provides:** a `Review` from `content/reviews.ts`, with `text`, `user`, `country`, `gig`, `platform` and `sourceUrl`.
  - Never edit the quote. The only change allowed is trimming it with "…".
- **Layout:**
  - card: `surface-0` with a `line` border and `radius-lg`
  - stars: `star`, with the numeric rating beside them
  - quote: `body`
  - meta row: `small` in `ink-muted`; the username is bold `ink`, the gig is a `MarketplaceChip`, and the source link is pushed to the right
- **Markup:** `<figure>` + `<blockquote>` + `<figcaption>`. The stars carry `aria-label="Rated 5 out of 5"`.
- **No avatars and no stock photos.** Reviewers are anonymous buyers, so their public username is their identity.
- **Don't:**
  - add AggregateRating or Review JSON-LD for these reviews. Google treats it as self-serving.
  - invent labels such as "Verified purchase".
