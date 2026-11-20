# 3s-soft.com Redesign — Design Spec

- **Date:** 2026-11-20
- **Status:** Approved by owner (Jashedul Islam Shaun)
- **Scope:** 3s-soft.com only. 3s-soft.net and 3s-soft.co.uk are later, separate projects (one site at a time).
- **Related docs:**
  - Research: [`../../research/2026-11-20-3s-soft-a-to-z-analysis.md`](../../research/2026-11-20-3s-soft-a-to-z-analysis.md)
  - Proof sources: [`../../research/real-proof-sources.md`](../../research/real-proof-sources.md)
  - Redirect map: [`../../research/redirect-map.md`](../../research/redirect-map.md)
  - Domain strategy: [`../../research/domain-strategy.md`](../../research/domain-strategy.md)
  - Build plan: [`../plans/2026-11-20-3s-soft-redesign-plan.md`](../plans/2026-11-20-3s-soft-redesign-plan.md)

---

## 1. Why

3s-soft.com should win clients. Today it loses trust instead:

- **Testimonials:** all 6 are fake (stock photos, "300% sales").
- **Case studies:** 12 of 13 are invented (RetailMax UK, MediCare HIPAA portal, StyleVogue AR try-on…), and every portfolio link is `#`.
- **Stats:** they contradict each other ("8+ years" vs "5+ years", "500+ projects", "98% satisfaction"). Counters render as `0+` in the static HTML.
- **Wrong lead offer:** the site leads with MERN development, but almost all public proof (465 Fiverr reviews) is for eCommerce listings, Amazon and lead generation.
- **No marketplace links:** there are no Fiverr or Upwork links anywhere.

The owner is starting outreach soon. Every link sent to a prospect must land on a site that is real, checkable, fast and clear.

## 2. Decisions (made by the owner)

| # | Decision |
|---|---|
| 1 | Lead offer is **eCommerce operations first**. Web development is a short teaser that points to 3s-soft.net. |
| 2 | **Domain roles:** 3s-soft.com is the main global agency site. 3s-soft.co.uk serves the UK market. 3s-soft.net is the web development site. |
| 3 | Portfolio uses **all real sources**: Fiverr portfolio, UK case studies, dev projects, Stahl-Design-Tebart. |
| 4 | Team: **all 9 members are real**. "Minhajul Abedin" in `team.json` is UK Director Minhajul Abedin Toyon (one person). |
| 5 | Main CTA is **direct contact** (WhatsApp, book a call, quote or audit form). Fiverr and Upwork appear neutrally as "Also available on…". |
| 6 | Build: **Next.js static export** (`out/`), uploaded to cPanel `public_html`. |
| 7 | Blog: **keep the best ~6 eCommerce posts**, fix them, and 301 the rest. |
| 8 | **Platform-ToS-safe wording.** Never mention avoiding platform fees. Never invite existing Fiverr or Upwork buyers off-platform. |
| 9 | Order of work: **one site at a time**, starting with .com. |
| 10 | Quality bar: **SEO 100, real trust, best UX/UI**. Use the design, SEO and QA skills (section 10). |

## 3. Audience & job of the site

**Primary visitor:** a seller or small brand on Amazon, Shopify, Walmart, Etsy or eBay, mostly in the US, UK or EU.
- **Needs:** listings, A+ Content, Brand Story, catalogue management, bulk uploads or B2B leads.
- **Situation:** comparing freelancers and agencies, often arriving from an outreach email or a LinkedIn DM.

**What they must understand within 10 seconds:**
1. **What we do:** marketplace listings and eCommerce operations.
2. **That it's real:** 5.0★ from 465 Fiverr reviews since 2015, Upwork Top Rated with 100% Job Success, listed on Amazon SPN.
3. **How to start:** WhatsApp, book a 15-minute call, or request a free 5-product listing audit.

**Secondary visitor:** someone who needs a store website or a custom app. Send them to 3s-soft.net.

## 4. Goals, non-goals, anti-goals

**Goals**
- Every number, review, badge and case study links to a public source and carries a "checked on" date.
- Each page has one clear primary action.
- Every page ships as real static HTML.
- Lighthouse mobile scores: SEO 100, Accessibility 100, Best Practices 100, Performance ≥95.
- Existing Google equity is kept: same URL patterns, and a 301 for every removed URL.
- The site is outreach-ready: a dedicated `/free-listing-audit` landing page, UTM-aware event tracking, and good link previews.

**Non-goals**
- No login, dashboard, CMS, blog admin, Firebase or PWA.
- No changes to 3s-soft.net, 3s-soft.co.uk or jashedulislamshaun.com in this project.

**Anti-goals** (a failure even if the site works)
- Any unverifiable stat, invented client, stock photo shown as a person, or inflated badge (for example "Top Rated Plus" or "500+").
- AggregateRating or Review JSON-LD for our own business. Google treats it as self-serving. Reviews are shown visually only.
- `0+` counters, or numbers that only render with JavaScript.
- Words such as "Guaranteed", ".edu backlinks", "24/7" or "98% satisfaction".
- Any wording that encourages taking marketplace buyers off-platform.

## 5. Positioning & copy direction

The builder may polish the wording. The facts must stay exact.

- **H1 direction:** "Amazon, Shopify & marketplace listings done right."
- **Sub:** "3s-Soft is the eCommerce operations team behind 465 five-star Fiverr reviews since 2015: listings, A+ Content, catalogue management and the websites that sell them."
- **Proof bar** (each item links to its source):
  - Fiverr 5.0★ from 465 reviews
  - Upwork Top Rated, 100% Job Success
  - Amazon SPN: A+ Content & Cataloguing
  - WordPress.org plugin
  - Since 2015
- **CTAs:** **WhatsApp us** · **Book a 15-min call** · **Get a free 5-product audit**. Secondary, neutral: "Also available on Fiverr & Upwork".
- **Reply time:** "Usually replies within about an hour". This is true per the Fiverr profile and must be re-checked before launch.
- **Tone:** plain, specific, honest. Short sentences. Concrete deliverables, no hype.

## 6. Information architecture

URL patterns stay the same where they exist today.

| URL | Content | Primary CTA |
|---|---|---|
| `/` | Hero and proof bar; eCommerce services; "Websites & development → 3s-soft.net" teaser; selected work (6); real reviews (verbatim, with username, country, date and link); process (Understand → Plan → Build & QA → Deliver & Support); "starting from" prices (pending owner OK); FAQ; final CTA | Free audit / WhatsApp |
| `/services` | eCommerce ops services, plus a web dev teaser linking to .net | Free audit |
| `/services/ecommerce-product-listing` | Amazon, eBay, Etsy, Walmart and Shopify listing and bulk upload (slug kept) | Free audit |
| `/services/amazon-a-plus-content` (new) | A+ Content, Brand Story, comparison charts, mockups (Amazon SPN listed) | Book call |
| `/services/shopify-store-management` (new) | Shopify setup, product management, Printful and sync work | Book call |
| `/services/lead-generation` | B2B lead generation, email research, prospect lists (slug kept) | Quote |
| `/services/virtual-assistant` | Renamed "Catalogue & data management / eCommerce VA" (slug kept) | Quote |
| `/portfolio` | Real work grid, filtered by Amazon / Shopify / Multi-marketplace / Lead Gen / Web (web cards link out to .net) | — |
| `/portfolio/:slug` | Brief; what we did; deliverables; real screenshots; live link or source; related review | Book call |
| `/reviews` (new) | Rating breakdown and curated verbatim reviews, each linked to Fiverr or Upwork | Free audit |
| `/about-us` | Story since 2015; founder; Chittagong HQ and UK arm; values; verifiable track record | Book call |
| `/team` | 9 members with real photos and real links (no `#`). Minhajul Abedin Toyon shown as UK Director, linking to .co.uk | — |
| `/blogs`, `/blog/:slug` | About 6 kept posts; each links to its service and a case study | Service CTA |
| `/contact` | WhatsApp, booking, email, phone, form, "Also on Fiverr & Upwork", UK office link | Form |
| `/free-listing-audit` (new) | Outreach landing page with no main nav: offer, short form (store URL, marketplace, email or WhatsApp), proof strip, 2 case studies, FAQ | Form |
| `/privacy-policy`, `/terms-of-service`, `/cookies` | Keep, with an updated date and the consent/analytics wording | — |
| `/404` | Static 404 page with useful links | — |

**Removed URLs:** all 301-redirected. See [`redirect-map.md`](../../research/redirect-map.md).

### Portfolio content (real only)
- **eCommerce case studies on .com:**
  - Ivan Troy: Amazon Brand Story and A+ Content
  - MONTIQUE Amazon store
  - Stahl-Design-Tebart: Amazon listing
  - Tailwater Supply: catalogue and marketplace angle
  - Selected Fiverr portfolio items (real screenshots)
- **Web and dev work:** shown as outbound cards to 3s-soft.net, or to the WordPress.org page and live URLs until .net has its own case studies.
  - Price & Stock Sync plugin
  - PortLedger
  - EmpowHR
  - ServiceHub Pro
- **Client names:** each entry has a `publicNameApproved` flag. While a name is not approved, the entry is anonymised (for example "US outdoor-retail brand").

## 7. Visual & UX direction

The builder executes this with the `frontend-design` skill. The homepage is approved before the other pages are built.

- **Look:** light, clean and trust-first, like a capable operator rather than a crypto startup.
  - Off-white background, deep ink text, one accent colour taken from the logo.
  - Marketplace-neutral, and not the current dark purple gradients.
  - Dark mode through design tokens.
- **Imagery:** real screenshots and real faces only. Every image has meaningful alt text.
- **Numbers:** large and readable, each with a small source link ("Fiverr ↗ checked Nov 2026").
- **Mobile first:** a sticky bottom bar with WhatsApp and Audit buttons on mobile; tap targets ≥44px.
- **Forms:** as few fields as possible, inline validation, clear success and error states, and a honeypot field for spam.
- **Motion:** subtle, and turned off for users who set `prefers-reduced-motion`.
- **Brand:** related to the .co.uk site (same logo and type) without copying its dark theme.

## 8. Technical design

- **Stack:**
  - Next.js (current stable, App Router), TypeScript, Tailwind CSS v4.
  - `next.config`: `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }`.
  - No DaisyUI, Firebase, PWA, axios or Swiper.
- **Packages: latest stable versions** (owner request; checked on npm 2026-11-20, Node 24.21 / npm 11.19). Pin exact versions in `package.json` and commit the lockfile.

  | Package | Version |
  |---|---|
  | next / @next/mdx / @next/third-parties / eslint-config-next | 16.4.6 |
  | react / react-dom | 19.3.1 |
  | typescript | 7.0.2 (if Next 16.4 type-checking breaks on TS 7, fall back to latest 6.x and record why) |
  | tailwindcss / @tailwindcss/postcss | 4.3.5 |
  | @mdx-js/react / @mdx-js/loader | 3.1.1 |
  | sharp | 0.35.5 |
  | eslint | 10.15.0 |
  | @types/react | 19.3.0 |
  | @types/node | 26.6.6 |
  | lucide-react | 1.76.0 |
  | schema-dts | 2.1.0 |
  | gray-matter | 4.0.3 |
  | @playwright/test | 1.65.1 |
  | linkinator | 8.1.0 |
  | lighthouse | 13.6.0 |

  Re-run `npm view <pkg> version` at scaffold time and take any newer stable release. Run `npm audit` with zero high or critical issues as a gate.
- **Images:** pre-converted to WebP or AVIF with `sharp`, each with explicit width and height.
- **Content as data** (single source of truth):
  - `content/site.ts`: name, contacts, socials, CTAs, booking link.
  - `content/proof.ts`: every stat, as `{ id, value, label, sourceUrl, checkedOn }`.
  - `content/reviews.ts`: `{ text (verbatim), user, country, platform, gig, date, url, checkedOn }`.
  - `content/services.ts`: service copy and FAQs.
  - `content/team.ts`
  - `content/portfolio/*.mdx`
  - `content/blog/*.mdx`
- **Forms:** a client component posts to the existing Formspree endpoint (`formspree.io/f/mgoyrdky`). The audit form posts there too, with a `form_type` field.
- **Analytics:**
  - GA4 (`G-JG742N2K6Z`) and Microsoft Clarity load only after consent, through a consent banner.
  - GA4 events: `whatsapp_click`, `book_call_click`, `form_submit`, `audit_submit`, `fiverr_click`, `upwork_click`.
  - UTM parameters are captured into the form's hidden fields.
- **SEO:**
  - `generateMetadata` on every page: title, description, canonical, OG and Twitter tags.
  - Custom OG image per page type.
  - JSON-LD: Organization + ProfessionalService, Person (founder), Service, BreadcrumbList, BlogPosting, FAQPage where FAQs are visible. No AggregateRating.
  - `sitemap.xml` and `robots.txt` generated at build; `llms.txt` kept and rewritten with real facts.
  - 404 page is `noindex`.
- **cPanel hosting:**
  - `npm run build` creates `out/`. Upload its contents to `public_html`.
  - `public/.htaccess` (copied into `out/`) does the following:
    - forces HTTPS and redirects www to the bare domain
    - sets `ErrorDocument 404 /404.html`
    - holds all 301s
    - sets `Cache-Control: public, max-age=31536000, immutable` for `/_next/static/`
    - sets `no-cache` for HTML
    - enables gzip/deflate and Brotli where available
- **Repo:**
  - Work happens on branch `redesign-nextjs`. The old Vite app is removed from the tree but stays in git history.
  - Delete `dist/`, `build_error.log`, `netlify.toml`, `public/_redirects`, the Firebase config, and the one-off `scripts/expand-*`.
- **Accessibility:** WCAG 2.2 AA. Semantic landmarks, skip link, visible focus, a single H1 per page, a sensible heading order, labelled form fields.

## 9. Quality gates (must pass before launch)

- **Lighthouse mobile:** SEO 100, Accessibility 100, Best Practices 100, Performance ≥95 on four pages: `/`, one service page, one case study, and `/free-listing-audit`.
- **Core Web Vitals:** LCP <2.0s, CLS <0.05, INP <200ms.
- **Proof data:** every item in `proof.ts` and `reviews.ts` has `sourceUrl` and `checkedOn`, enforced by a build-time check.
- **Banned strings:** the build output contains none of:
  - `500+`, `98%`, `24/7`, `Guaranteed`, `Top Rated Plus`, `lorem`
  - the fake client names (RetailMax, DataDriven, MediCare, StyleVogue…)
  - the fake reviewer names (Sarah Johnson, sj_marketing…)
- **Links:** a link check over `out/` shows no broken internal links and no `#` hrefs.
- **Schema:** JSON-LD passes the Rich Results Test and the Schema.org validator.
- **Redirects:** all 301s tested on a staging subdomain before going live.

## 10. Skills used

| Stage | Skills |
|---|---|
| Plan | `superpowers:writing-plans` |
| Keywords | `searchfit-seo:keyword-clustering`, `marketing:seo-audit` (competitor gaps) |
| Design & UX | `frontend-design:frontend-design`, `design:design-critique`, `design:ux-copy`, `small-business:brand-style` |
| Build | `vercel:nextjs`, `vercel:react-best-practices` |
| SEO | `searchfit-seo:on-page-seo`, `searchfit-seo:technical-seo`, `searchfit-seo:schema-markup`, `searchfit-seo:internal-linking`, `searchfit-seo:ai-visibility` |
| Content | `searchfit-seo:content-brief`, `marketing:content-creation`, `brand-voice:enforce-voice` |
| QA | `design:accessibility-review`, `searchfit-seo:broken-links`, `searchfit-seo:seo-audit`, `playwright-skill:playwright-skill`, `superpowers:verification-before-completion` |
| Review | `superpowers:requesting-code-review` |
| After launch (separate) | `small-business:outreach-composer`, `sales:draft-outreach`, `small-business:lead-finder` |

## 11. Approaches considered

| Approach | Trade-off | Verdict |
|---|---|---|
| A. Redesign inside the current React + Vite SPA | Least disruption and already proven on cPanel. But each page is an SPA shell with hidden SEO text added at build time, which is fragile (it is the cause of the `0+` counters). Most UI gets rewritten anyway. | Rejected |
| **B. Rebuild in Next.js as a static export** | Real HTML per page, the same stack as 3s-soft.co.uk (shared patterns), and a clean slate free of fake data. Costs a full rebuild plus a redirect map. | **Chosen** |
| C. Astro static | Fastest pages and the least JavaScript, but a new stack with nothing shared with the other sites. | Rejected |

## 12. Left to the builder

- Exact copy wording, as long as every fact stays exact.
- Component breakdown, icon set and subtle animation.
- Which extra real Fiverr portfolio items to include.
- Image compression settings.
- Whether to make the optional printable "credentials" page.

## 13. Open items (owner answers during the build; they don't block scaffolding)

1. Which client names may be shown publicly: Tailwater Supply, Ivan Troy, MONTIQUE, Stahl-Design-Tebart.
2. Booking link for .com: reuse `cal.com/3s-soft-uk/15min`, or create `cal.com/3s-soft/15min`.
3. A real photo for Mehedi Hasan Akash (the current one is from Unsplash). Real profile links for Sajib, Minhajul, Shahidul, Akash and Fariya.
4. Whether to show "starting from" prices. Proposed: match Fiverr (listing from $10, lead generation from $25).
5. Upwork total hours and the countries-served count: confirm them, or leave them out.
6. Which builder's calls on blog keep/redirect to change, if any (see redirect map).
