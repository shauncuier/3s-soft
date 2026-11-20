# MarketplaceChip

A MarketplaceChip is a small tag that names a marketplace, a deliverable, or a marketplace identifier.

- **Variants:**
  - default: a platform or gig name on `surface-0` with a `line` border
  - `id`: `mono` text on `surface-200`, for example ASIN, SKU or GTIN values in case studies
  - `active`: `green-100` with a `green-700` border, for a pressed portfolio filter
- **Consumer provides:** the text. As a filter, it is a `<button aria-pressed>`. Otherwise it is a `<span>`.
- **Text only:** write marketplace names as words, never as third-party logos.
- **Example identifiers** in demos must either be clearly fake (like `B0C1X2Y3Z4`) or come from the client's public listing, with their permission.
