# 3s-soft.com

The main agency site for **3s-Soft**, an eCommerce operations team in Chittagong, Bangladesh. It serves Amazon, Shopify, Walmart, Etsy and eBay sellers worldwide.

The site exists to turn a seller who is comparing freelancers into a direct conversation. Every claim on it can be checked: **5.0★ from 465 Fiverr reviews since 2015**, Upwork Top Rated with 100% Job Success, listed on Amazon's Service Provider Network, and a published WordPress.org plugin.

| Domain | Role |
|---|---|
| **3s-soft.com** (this repo) | Main agency site, global, eCommerce operations first |
| [3s-soft.co.uk](https://3s-soft.co.uk) | UK market |
| [3s-soft.net](https://3s-soft.net) | Web development studio |

> **Status:** redesign in progress on branch `redesign-nextjs`. The live site still runs the old React/Vite build from `main`.

## Stack

- **Next.js 16** (App Router) with `output: 'export'`, so every route is plain static HTML in `out/`
- **React 19**, **TypeScript 6**
- **Tailwind CSS 4**, with tokens taken from the design system
- Case studies and blog posts as typed TypeScript content in `src/content/`
- **Vitest** + Testing Library (unit tests), **Playwright** + axe (end-to-end and accessibility), linkinator, Lighthouse
- Hosting: **cPanel** shared hosting (Apache). No Node server runs in production.

### No framework JavaScript in the browser

Next.js is used as a static HTML generator only. After `next build`, `scripts/strip-runtime.ts` removes every React/Next script, preload and RSC payload from `out/`. A page ships one small script, `/assets/site.js` (about 3.5 KB gzipped, built by `scripts/build-client.ts` from `src/client/`). An inline loader adds it after the page has loaded. It wires up:

- the mobile menu and current-section link
- the cookie banner and consent-gated analytics
- click tracking (`data-track`)
- the lead forms (validation, sending to `/api/lead.php`, success/failure)
- the portfolio filter
- the before/after toggle

So components in `src/components/` are server-only markup with `data-*` hooks. Never add `'use client'` or event handlers; put behaviour in `src/client/` with a test in `tests/unit/client.test.tsx`. The build fails if framework JS reaches a page.

Speed rules that keep Lighthouse mobile at 100:

- Images use `<Img>` (`src/components/Img.tsx`), which serves an 800 px copy to phones (`scripts/build-images.ts`). Mark the first on-screen image `priority`.
- Long pages can mark below-the-fold sections `defer-render` (`content-visibility: auto`). Run the phone-width axe test after adding it: axe can misread text inside a skipped section.
- No `<select>` on the audit form (radio chips instead), and no flex layout on `<body>`. Both made the first layout much slower.

## Getting started

Requires **Node 24+**.

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/` |
| `npm start` | Serves `out/` at http://localhost:4321 |
| `npm test` | Unit and build tests (Vitest) |
| `npm run test:e2e` | Playwright end-to-end and accessibility tests against `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Lint, test, build and e2e in one go |

### Environment

Create `.env.local` (never commit it):

```bash
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_id   # Microsoft Clarity
NEXT_PUBLIC_NOINDEX=1                           # staging builds only
```

GA4 (`G-JG742N2K6Z`) and Clarity load only after a visitor accepts analytics cookies.

## Project layout

```
src/app/          routes (one folder per page)
src/components/   UI components built from the design system
src/content/      ALL site facts: proof numbers, reviews, services, team, case studies, blog
src/lib/          SEO helpers, analytics/consent, lead-form logic, site-script loader
src/client/       the only browser script (bundled to /assets/site.js)
scripts/          build steps: tokens, proof check, .htaccess, llms.txt, client bundle, image variants, runtime strip, output gate
tests/            unit/, build/, e2e/
public/           static assets, .htaccess (generated), llms.txt
design-system/    source of the 3s-Soft design system (tokens, components, brand book)
docs/             specs, plans, research, reviews
```

## Content rules (read before editing copy)

1. **Real proof only.**
   - Numbers live in `src/content/proof.ts` and reviews in `src/content/reviews.ts`. Every entry needs a `sourceUrl` and a `checkedOn` date.
   - The build fails if one is missing.
   - Never publish "500+ projects", "98%", "24/7", "Guaranteed" or "Top Rated Plus". A build check bans these strings.
2. **Platform-safe wording.**
   - Present Fiverr and Upwork neutrally ("Also available on Fiverr & Upwork").
   - Never mention avoiding fees, and never invite marketplace buyers off-platform.
3. **Client names** appear only after the client agrees (`publicNameApproved` in each case study).
4. **SEO and tone.**
   - Each page targets one keyword cluster from `docs/research/keyword-map.md`.
   - Copy is checked with the humanizer skill before it ships.
5. **Re-check proof monthly.** Update the numbers and `checkedOn` dates against the live Fiverr and Upwork profiles.

## Design system

The brand's tokens, type, components and usage rules are in [`design-system/project/README.md`](design-system/project/README.md):
- logo green `#2F8C44` and charcoal `#585557`
- Archivo, Public Sans and JetBrains Mono

A browsable version is published as the private "3s-Soft Design System" artifact.

The files under `design-system/project/` are the source for that page. Keep them at their current paths.

## Deploying to cPanel

1. `npm ci && npm run build`
2. Back up the current `public_html` as a zip from cPanel File Manager.
3. Zip the **contents** of `out/`, including `.htaccess`. Upload and extract it into `public_html`.
4. Check:
   - HTTPS redirects
   - one old URL that should 301
   - the 404 page
   - one form submission

The full runbook, with staging and rollback, is in `docs/deploy.md`. It is written in the final build task.

## Documentation

| Doc | What it covers |
|---|---|
| [docs/superpowers/specs/2026-11-20-3s-soft-redesign-design.md](docs/superpowers/specs/2026-11-20-3s-soft-redesign-design.md) | The approved redesign spec |
| [docs/superpowers/plans/2026-11-20-3s-soft-redesign-plan.md](docs/superpowers/plans/2026-11-20-3s-soft-redesign-plan.md) | Task-by-task build plan |
| [docs/research/2026-11-20-3s-soft-a-to-z-analysis.md](docs/research/2026-11-20-3s-soft-a-to-z-analysis.md) | A–Z analysis of 3s-Soft: track record, real work, fake-content inventory |
| [docs/research/real-proof-sources.md](docs/research/real-proof-sources.md) | Every proof number and review allowed on the site, with sources |
| [docs/research/redirect-map.md](docs/research/redirect-map.md) | Old URL → new URL 301 map |
| [docs/research/domain-strategy.md](docs/research/domain-strategy.md) | Roles of .com / .co.uk / .net and cross-linking rules |
| [docs/research/seo-analysis-old-vite-site.md](docs/research/seo-analysis-old-vite-site.md) | SEO notes on the previous Vite site |
| [docs/design-system/ui-ux-review.md](docs/design-system/ui-ux-review.md) | UI UX Pro Max and Vercel Web Interface Guidelines reviews of the design system |
| [docs/archive/old-vite-content/](docs/archive/old-vite-content/) | Data files from the old site, kept for reference |

## Contact

info@3s-soft.com · WhatsApp +880 1835 927634 · Chittagong, Bangladesh
