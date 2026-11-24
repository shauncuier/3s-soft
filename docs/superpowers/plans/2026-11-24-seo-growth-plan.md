# 3s-soft.com: SEO and client growth plan

- **Started:** 2026-11-24
- **Based on:** `docs/research/2026-11-24-seo-audit.md`
- **Goal:** rank on page 1, and #1 where we can, for the keywords that bring paying sellers, and turn that traffic and outreach into clients.

**Honest scope:** nobody can promise #1 on Google. What we can control is having the best page for each keyword, proof nobody else can match, and a steady stream of links and mentions. The plan targets the keywords we can win first (Handmade, flat file, variations, Walmart, Etsy, eBay, free audit). The hard head terms ("amazon listing optimization service") come later, once the site has authority. Clients come faster from outreach than from SEO, so Phase 4 runs alongside everything else.

**Who does what:** **[Claude]** = code or content I write. **[You]** = needs your login, your money, or your decision. Every live deploy waits for your OK.

---

## Phase 0: Google sees the new site (this week) [You]

Google still shows about 15 old URLs, including the fake case studies. Until it recrawls them, the new pages compete with ghosts.

1. **Search Console** (https://search.google.com/search-console), property `3s-soft.com` (Domain):
   - Submit `https://3s-soft.com/sitemap.xml`.
   - In URL inspection → Request indexing, one at a time: `/`, `/services/`, the 5 service pages, `/portfolio/`, `/reviews/`, `/free-listing-audit/`, `/contact/`.
   - Submit `https://3s-soft.com/old-urls.xml` once Claude has deployed it (Phase 1, item 6).
2. **Bing Webmaster Tools:** import from Search Console and submit the same sitemap. Bing also feeds ChatGPT search and Copilot.
3. **GA4:** mark the `/thank-you/` page view as a key event (conversion).
4. **Google Business Profile** for 3s-Soft, Chittagong: category "Internet marketing service" or "Software company", plus the website, the WhatsApp number and the services.
5. In 2 weeks, check Search Console → Pages: the old URLs should show as "Page with redirect".

## Phase 1: on-page fixes (this week) [Claude]

Each item: change, test, build, then deploy to staging and live **after your OK**.

1. **Title lengths.** Every page `<title>` is 60 characters or less. Case studies and blog posts get a short `metaTitle`, and About, Team and Contact get keyword titles. The build gate fails if a title is over 60.
2. **OG images.** Service pages and blog posts lose the default share image today, because their `openGraph` object replaces the layout's. Give every service and post a share image. The build gate fails if an indexable page has no `og:image`.
3. **Internal links.** Each service page gets a "Guides for this service" block linking its posts, and each post gets "Related guides". No page is linked from only one place.
4. **Prices.** "Starting from" prices from the live Fiverr gigs (listing from $10, lead gen from $25, Handmade from $10, data entry from $20) on the service pages, plus `offers` in the Service JSON-LD. **[You]** confirm the prices first.
5. **Homepage speed.** Find the style and layout cost (about 1.1 s in the lab) and bring TBT under 200 ms.
6. **old-urls.xml.** A temporary sitemap of the old URLs so Google recrawls their 301s. Remove it after 4 weeks.
7. **Per-page sitemap `lastmod`** taken from each page's real updated date.

## Phase 2: pages for the keywords we can win (weeks 2–4) [Claude, using your proof]

One keyword cluster per URL. Each page: 900–1,500 words, real steps, real screenshots, an FAQ, linked reviews, a case study, a price and a CTA.

| New page | Primary keyword | Proof to use |
|---|---|---|
| `/services/walmart-listing/` | walmart listing service | Tailwater Supply (Walmart), Walmart reviews from Fiverr |
| `/services/etsy-listing/` | etsy listing service | Etsy reviews from Fiverr |
| `/services/ebay-listing/` | ebay listing service | eBay reviews from Fiverr |
| `/services/amazon-handmade-listing/` | amazon handmade listing service | Handmade gig: 5.0 from 98 reviews |
| Sections on `/services/ecommerce-product-listing/` | amazon flat file upload, variation listing, bulk upload | M & A Global (2,451 listings, 0 errors), MONTIQUE (895 parents) |

**[You]** For each marketplace, point me to 2–3 real Fiverr or Upwork reviews and any screenshots (Seller Central, Etsy dashboard) you're happy to show. No page goes live without real proof.

## Phase 3: guides that bring sellers in (weeks 3–8) [Claude]

Informational posts, each 1,200+ words, built from real work and linking to the matching service:

1. How to fix a suppressed Amazon listing (step by step, with Seller Central screens)
2. Amazon A+ Content image sizes for every module (table plus templates)
3. Amazon flat file upload: a walkthrough with a sample sheet
4. Shopify CSV product import: template and common errors
5. Amazon variation (parent/child) setup: how MONTIQUE's 895 parents were built
6. Expand the 6 existing posts to 1,000+ words

Rhythm: 1 guide a week. Each one is linked from its service page and shared on LinkedIn.

## Phase 4: authority and clients (start now, ongoing)

**Links and mentions [You, with drafts from Claude]:**
1. Apply to the **Helium 10 provider hub** (it ranks #1 for "amazon listing optimization service").
2. **Clutch** and **GoodFirms** profiles, then ask 3–5 past direct clients for a Clutch review.
3. Keep the **Amazon SPN** listing current: services, description, link to 3s-soft.com.
4. Email the authors of the "best A+ content agencies 2026" and "best listing services" articles (Desverto, olifantdigital, mds.co, xneeti) asking to be included, with proof links. Claude drafts the emails.
5. Guest posts and podcast spots on Amazon-seller blogs and shows. Claude drafts the pitches.
6. Link 3s-soft.com from every profile you own: Fiverr bio, Upwork agency, LinkedIn company page, YouTube channel, GitHub, 3s-soft.co.uk and 3s-soft.net.

**Direct client outreach (fastest path to revenue):**
1. **Offer:** the free 5-product listing audit at `/free-listing-audit/` (UTM links track every campaign).
2. **Targets:** Amazon and Shopify brands with weak listings: fewer than 5 images, no A+ Content, short titles, suppressed ASINs. Claude builds lists of 50 a week with `small-business:lead-finder`.
3. **Channels:** LinkedIn (founder profile, 20 connection requests a day plus a short note), cold email (20–30 a day from a warmed-up mailbox, not info@), and seller Facebook groups and Reddit (help first, link only where allowed).
4. **Message:** one specific fix seen on their listing, the free audit link, and one proof line ("5.0 from 465 Fiverr reviews since 2015"). Claude drafts the sequences with `sales:draft-outreach`.
5. **Follow-up:** reply within 1 hour (matching the Fiverr response time), send the audit within 48 hours, then a fixed quote.
6. **Target:** 100 contacts a week → about 5–10 audits → 1–3 clients a week once it is running.

## Phase 5: measure and repeat (every 2 weeks)

- **Search Console:** impressions, clicks and position per target keyword. Add keywords that sit at positions 8–20 to the page that ranks for them.
- **GA4:** form submissions, WhatsApp clicks and bookings, by `utm_source`.
- Re-run the SEO audit every 4–6 weeks. Connect Ahrefs or Semrush for volumes and backlinks when possible.
- Keep proof current: re-check the Fiverr and Upwork numbers monthly and update `checkedOn`.

## Progress

| # | Item | Status |
|---|---|---|
| 0.1–0.5 | Search Console, Bing, GA4, Business Profile | Waiting on you |
| 1.1 | Title lengths | Done (not deployed): 21 page titles 60 characters or less; the build gate checks it |
| 1.2 | OG images | Done (not deployed): 11 share cards drawn at build; the build gate checks every indexable page
| 1.3 | Internal links | Done (not deployed): services link their guides; each guide links 3 others
| 1.4 | Prices | Waiting on your price OK |
| 1.5 | Homepage speed | Pending |
| 1.6 | old-urls.xml | Pending |
| 1.7 | Sitemap lastmod | Pending |
