# Real Proof Sources

This page holds every proof item allowed on 3s-soft.com. Each item needs a source URL and a checked-on date. Anything not listed here may not be published.

- Snapshot date: **2026-11-20**
- Re-check these numbers right before launch, and then every month.

## Profiles

| Item | URL |
|---|---|
| Fiverr seller profile | https://www.fiverr.com/jashedulislam |
| Fiverr full portfolio | https://www.fiverr.com/users/jashedulislam/portfolio |
| Upwork freelancer profile | https://www.upwork.com/freelancers/~01c75e88b6540d813f |
| Upwork agency profile | https://www.upwork.com/agencies/2093425202844360561/ |
| WordPress.org plugin | https://wordpress.org/plugins/3s-soft-price-stock-sync-for-dropshipzone/ |
| Amazon SPN: Enhanced Brand Content (A+) | https://sellercentral.amazon.com/gspn/provider-details/Enhanced%20Brand%20Content/d0034058-2c31-4502-87f9-c29514841f24?localeSelection=en_US&sellFrom=US&sellIn=US |
| Amazon SPN: Cataloguing | https://sellercentral.amazon.com/gspn/provider-details/Cataloguing/d0034058-2c31-4502-87f9-c29514841f24?localeSelection=en_US&sellFrom=US&sellIn=US |
| UK arm | https://3s-soft.co.uk |
| Founder | https://jashedulislamshaun.com · https://linkedin.com/in/jashedulislamshaun · https://github.com/shauncuier |

## Numbers allowed (as of 2026-11-20)

| id | Value | Label | Source |
|---|---|---|---|
| `fiverr-rating` | 5.0 | Fiverr rating | Fiverr profile |
| `fiverr-reviews` | 465 | Fiverr reviews | Fiverr profile |
| `fiverr-five-star` | 444 | 5-star reviews | Fiverr profile |
| `fiverr-since` | 2015 | Selling on Fiverr since | Fiverr profile, work experience |
| `fiverr-response` | ~1 hour | Average response time | Fiverr profile |
| `upwork-badge` | Top Rated | Upwork badge | Upwork profile |
| `upwork-jss` | 100% | Upwork Job Success | Upwork profile |
| `upwork-jobs` | 55 | Upwork jobs completed | Upwork profile meta ("55 jobs completed") |
| `amazon-spn` | 2 | Amazon SPN listings (A+ & Cataloguing) | SPN pages |
| `wp-plugin` | 1 | Published WordPress.org plugin | WordPress.org |

Not allowed until verified: "30+ countries", "2,300+ Upwork hours".

Never allowed: "500+ projects", "98%", "24/7", "Top Rated Plus", "Level 2" shown as the top level.

## Verbatim reviews (usable, all public)

Copy the text exactly. Show username, country, date (relative to the checked-on date) and gig, and link to the source.

| Platform | User | Country | When (as of 2026-11-20) | Gig / Job | Text |
|---|---|---|---|---|---|
| Fiverr | cromwelltoby | United States | ~2 months ago · ongoing collaboration · $100–200 · 3 weeks | Product Upload | "He built an excellent transaction capable website via Amazon and Walmart. It turned out great and creates a perfect chassis to build my business on." |
| Fiverr | cromwelltoby | United States | ~3 months ago · ongoing · $50–100 · 3 weeks | Product Upload | "He was very quick in getting my listings created for me. I certainly recommend his services as he is skilled and very knowledgeable on Amazon." |
| Fiverr | seo_mayhem | United States | ~5 months ago · $50 · 9 days | E-Commerce SEO | "This guy is great. He is a hard worker and is always determined to get things done." |
| Fiverr | alertme27 | United States | ~5 months ago · $50–100 · 4 days | Product Upload | "Highly recommend!!! Amazing customer service!!" |
| Upwork | Fouad L. | — | Feb 12, 2026 · 5.0 | Place pictures into mockups | "Excellent work and very professional collaboration. Communication was clear, fast, and efficient throughout the entire project. All mockups were delivered exactly as requested…" (truncated on the public page; get the full text from the Upwork dashboard) |
| Upwork | Arye G. | — | Aug 19, 2022 · 5.0 | Experienced Shopify VA – Import products to Shopify | "great work!" |

Skip: martinberry478 (UK). The review text reads as if the seller wrote it ("I understood the brief…"), so it would confuse visitors.

**Done 2026-11-20:** the site's review list lives in `src/content/reviews.ts`. It holds 13 reviews, copied verbatim from the three Fiverr gig pages and the Upwork profile:
- **Fiverr:** cromwelltoby ×3, alertme27, sharecave, seo_mayhem, garrymackie, alexwolfee, summerhillhome, alexandre_bdl, cherrylanchor
- **Upwork:** Fouad L., Arye G.

**Still to do:**
- Collect 10–15 more strong Fiverr reviews (Fiverr → Reviews → "Most relevant", and also the reviews that include files).
- Prefer reviews that mention Amazon, A+, Shopify, Walmart, leads or bulk uploads, so each service page has 2–3 matching reviews.

## Rules

1. Numbers live only in `content/proof.ts` and reviews only in `content/reviews.ts`. Both carry `sourceUrl` and `checkedOn`.
2. A build-time check fails if an entry is missing either field.
3. No AggregateRating or Review schema for our own business.
4. If the live source drops below the published number, update the site within a week.
