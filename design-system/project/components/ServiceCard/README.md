# ServiceCard

A ServiceCard is a linked summary of one service: what it is, three deliverables, and the platforms it covers.

- **Consumer provides:**
  - a `Service` from `content/services.ts`: `title`, `summary`, the first three `deliverables`, and `platforms`
  - the card's `href`
  - one Lucide icon at 24px, shown in a `green-100` tile
- **Layout:**
  - the whole card is one `<a>`
  - title: `h3` (Archivo expanded)
  - summary: `body` in `ink-muted`
  - deliverables: a dotted list
  - platforms: `MarketplaceChip`s
  - "See … →" is pinned to the bottom so cards in a row line up
- **Hover:** the border turns `green-700`. No lift and no shadow.
- **Grid:** 3 columns on desktop, 2 on tablet, 1 under 640px, with a `space-6` gap.
- **Don't:** list more than three deliverables, or claim results such as "doubles sales".
