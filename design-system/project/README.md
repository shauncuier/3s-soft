3s-Soft is the eCommerce operations team behind 5.0★ from 465 Fiverr reviews since 2015. The site exists to turn a seller who is comparing freelancers into a direct conversation. Every visual choice serves one idea: **real work, shown plainly, easy to check.**

## Content fundamentals

- **Voice:** a capable operator talking to a busy seller. Plain, specific, short sentences. Name the marketplace, the deliverable, the number.
- **Person:** "we" for 3s-Soft, "you" for the seller. Shaun is named as founder, not as "I", on agency pages.
- **Casing:** sentence case for headings and buttons ("Get a free audit", not "Get A Free Audit"). The brand is written **3s-Soft** in running text. The logo lockup stays as drawn.
- **Proof rule:** a number appears only with its source. Write `5.0 ★ · 465 Fiverr reviews` and link it, with a mono stamp `checked 2026-11-20`. Never write "500+", "98%", "24/7", "guaranteed" or "Top Rated Plus".
- **Marketplaces:** write them the way sellers do: Amazon, Shopify, Walmart, Etsy, eBay, WooCommerce, "A+ Content", "Brand Story", "ASIN", "SKU". Fiverr and Upwork appear only as "Also available on Fiverr & Upwork". Never mention fees or invite platform buyers off-platform.
- **No emoji** in UI copy. The only glyph is the star `★` next to a rating number.
- **Real copy examples:**
  - Hero: "Amazon, Shopify & marketplace listings done right."
  - Proof: "Usually replies within about an hour."
  - CTA: "Get a free 5-product audit" · "WhatsApp us" · "Book a 15-min call"
  - Review (verbatim): "He was very quick in getting my listings created for me." (cromwelltoby, United States)

## Visual foundations

**Colour**
- Ground is cool, neutral `surface-100`. Content sits on `surface-0` cards. Text is `ink`; secondary text is `ink-muted`.
- Green is the brand. Use `green-700` for the primary button, links and focus. `brand-green` is the logo's exact green, used only for marks and display-size accents. It is too light for small text on white.
- `brand-charcoal` is the logo's grey. Set proof numerals in it so the numbers feel like part of the mark.
- `star` colours rating stars only. `danger` is for form errors only, always with an icon and words.
- One accent per view. No gradients, no purple, no neon.

**Type**
- `display-*` and `numeral` use Archivo at width 112 (`font-stretch: 112%`), which matches the wide geometric 3S letterforms.
- Running text uses Public Sans (`body`, `body-l`, `small`).
- Marketplace identifiers, prices in tables and source stamps use JetBrains Mono (`mono`). This is the brand's working detail: ASINs and SKUs are what sellers see all day.
- One H1 per page. Headings use `text-wrap: balance`. Running text stays within `measure`.
- Load the Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,600..800&family=Public+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

In Next.js, use `next/font/google` (self-hosted at build, no layout shift) with the same families and axes.

**Spacing & layout**
- 4px base: `space-1` up to `space-24`.
- Side gutter is at least `space-4`. Sections use `space-12` on mobile, `space-16` on tablet and `space-24` on desktop.
- Container width is `content-max`. Use a 12-column grid on desktop and a single column under 640px.
- Lay out with grid or flex `gap`, never with margins between siblings.

**Shape**
- `radius-md` for controls, `radius-lg` for cards and screenshots, `radius-sm` for chips. Pills (`radius-pill`) are only for status and the round WhatsApp button.
- The S in the logo is two stacked arcs, green over charcoal. That arc is the brand's one decorative shape: half-rounds and quarter-circles built from `radius-lg` multiples. Use it on the cover and section dividers only, never behind text.

**Surfaces, borders, shadows**
- Cards get a 1px `line` border on `surface-0`, with no shadow by default.
- `shadow-card` lifts at most one element per view: the lead form or a featured case study.
- `shadow-bar` is for the sticky mobile CTA bar and the scrolled header.

**Imagery**
- Real screenshots of delivered work: A+ modules, listings, store pages. Show them in a `radius-lg` frame with a `line` border, with alt text that says what the image shows.
- Real team photos only. If there is no photo, use initials on `green-100`.
- No stock people, no 3D illustrations, no AI art.

**Motion**
- Durations: 100ms for press feedback (`scale(.98)` on buttons, transform only, so nothing shifts), 150ms for hover and focus colour changes, 200ms for opening a menu or the consent banner. Easing is `ease-out` when something arrives and `ease-in` when it leaves, and exits run faster than entries.
- No count-up numbers, no scroll-triggered fades that hide content, no parallax.
- **No auto-rotating carousels.** Reviews and work sit in a static grid. If a slider is ever needed, it gets previous/next/pause buttons and stops on hover, focus and reduced motion.
- Honour `prefers-reduced-motion`.

**Layering**
- Use the `zIndex` tokens only: `z-sticky-header` < `z-cta-bar` < `z-consent` < `z-toast`. No other z-index values.

**Page pattern**
- Every landing page follows the same order: hero (offer and primary CTA) → proof bar → services → selected work → verbatim reviews → process → FAQ → CTA. Proof comes before every ask.
- One primary CTA per screen. The secondary action is visibly weaker (`secondary` or `quiet` button).

**States**
- Hover darkens fills (`green-700` → `green-800`).
- Focus is always a 3px `focus` ring with a 2px offset.
- Press shows `scale(.98)` for 100ms on buttons.
- Disabled is 50% opacity plus `cursor: not-allowed`, and the reason is shown in text.
- Loading keeps the button's label and adds "Sending…". The button is disabled while a request is pending.

**Accessibility**
- Every text pair in the tokens meets 4.5:1 in both themes. Marks and control borders meet 3:1.
- Tap targets are at least `tap-min`.
- Status is never shown by colour alone: errors carry an icon and words, ratings carry the number.

## Iconography

- Lucide (`lucide-react`), 1.75px stroke, 20px in text and 24px in cards, coloured with `ink` or `green-700`.
- Marketplace names are written as text chips (`MarketplaceChip`), not third-party logos. That avoids trademark-use issues and keeps the page light.
- The WhatsApp CTA uses Lucide `MessageCircle` plus the word "WhatsApp". No official WhatsApp logo is needed.
- The logo files live under **Logos**. Never redraw, recolour or stretch the mark. On dark grounds, place it on a `surface-0` tile until a reversed logo file exists.

## Components

- **Button:** primary (`green-700`), secondary (outlined), quiet (text).
- **ProofStat:** a number plus its source stamp.
- **ReviewCard:** a verbatim quote with buyer, country, gig and source.
- **ServiceCard:** a service with its deliverables and marketplace chips.
- **MarketplaceChip:** a platform or identifier tag.
- **FormField:** a labelled input with required marker, hint and error.
- **ErrorSummary:** a focusable list of problems after a failed submit.
- **MobileCtaBar:** a sticky WhatsApp + audit bar under 768px.

Use them for every page of 3s-soft.com. Build any new pattern from the same tokens.
