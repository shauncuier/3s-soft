# UI UX Pro Max review: 3s-Soft design system

- **Date:** 2026-11-20
- **Reviewed:** `design-system/project` (tokens, README, bundle.css, previews)
- **Checked against:** the UI UX Pro Max rule set (sections 1–8), its design-system recommendation for "B2B ecommerce service agency trust", and its landing, UX and Next.js stack data.

## What the tool recommended, and what we kept

| Area | Tool recommendation | Decision |
|---|---|---|
| Pattern | "Trust & Authority + Conversion": hero → proof (certs, stats) → solution → clear CTA; case studies; low-friction form | **Adopted.** It matches our page order. Written into README "Page pattern". |
| Colour | Navy/slate corporate with a blue CTA | **Rejected.** It's a generic default. The brand's own logo green and charcoal already give the trust signal, and every pair passes AA. |
| Type | Plus Jakarta Sans for everything | **Rejected.** Archivo Expanded echoes the wide 3S letterforms, and the mono font carries the ASIN/SKU detail. |
| Style | "Accessible & Ethical": high contrast, 16px+, visible focus, reduced motion | **Adopted.** It was already the direction. The focus ring went up to 3px. |
| Anti-patterns | No playful design, no hidden credentials, no purple gradients | Already covered. |
| Social proof | Verified, dated testimonials; carousels need pause and stop on focus | **Adopted.** Reviews use a static grid, and README bans auto-rotating carousels. |

## Contrast audit (WCAG 2.2, both themes)

All text pairs pass 4.5:1, and all marks and control borders pass 3:1. Pairs checked:

| Pair | Light | Dark |
|---|---|---|
| `ink-muted` on `green-100` (proof source stamp) | 5.41 | 5.55 |
| `brand-charcoal` on `green-100` (proof numerals) | 6.31 | 8.09 |
| `green-700` on `green-100` | 4.61 | — |
| `focus` on `surface-100` | 4.98 | 10.72 |
| `line-strong` on `surface-0` (input borders, 3:1 needed) | 3.50 | 3.65 |
| `star` on `surface-0` (icon, 3:1 needed) | 4.44 | — |
| `on-green` on `green-800` (hover) | 7.65 | 10.00 |
| `danger` on `surface-0` | 6.57 | 7.45 |

The logo green `brand-green` on `surface-100` is 3.92:1. It stays limited to marks and display-size text, as its token note already says.

## Findings fixed

| # | Rule | Issue | Fix |
|---|---|---|---|
| 1 | `focus-states` / accessible style | 2px ring | 3px `focus` ring, 2px offset |
| 2 | `required-indicators` | No required marker | "(required)" in `ds-field__req` plus the `required` attribute |
| 3 | `error-summary`, `focus-management` | No pattern for forms with several errors | New **ErrorSummary** component (focusable, linked, role=alert) and a network-failure message |
| 4 | `aria-live-errors` | Inline error not announced | `role="alert"` on field errors |
| 5 | `input-type-keyboard`, `autofill-support` | Not specified | `type`/`inputmode`/`autocomplete` rules in FormField |
| 6 | `press-feedback`, `cursor-pointer`, `tap-delay` | No pressed state | `scale(.98)` 100ms on press, `cursor:pointer` and `touch-action: manipulation` on all controls |
| 7 | `touch-target-size` | Filter chips about 26px tall | Button chips get `min-height: tap-min` (44px) and a `line-strong` border |
| 8 | `focus-not-obscured`, `z-index-management` | Sticky CTA bar could hide focused fields; no layer scale | `scroll-padding-bottom` rule, and a new `zIndex` token family (header 40 < CTA bar 50 < consent 60 < toast 70) |
| 9 | `long-token-wrapping` | Long URLs or ASINs could overflow | `overflow-wrap: anywhere` on chips and review quotes |
| 10 | `duration-timing`, `exit-faster-than-enter` | Only one motion rule | Motion durations and easing rules in README |

## Notes for the Next.js build

- Load fonts with `next/font/google` (self-hosted, no layout shift), not a `<link>` tag. Archivo needs the `wdth` axis.
- Generate `tokens.css` / the Tailwind v4 `@theme` from `tokens.json`, so the design system and the site share one source.
- Lucide stays the icon set. The tool defaults to Phosphor; either is fine, but use only one.
