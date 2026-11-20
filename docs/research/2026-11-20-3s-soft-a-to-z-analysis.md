# 3s-Soft A–Z Analysis

All data below is a snapshot of live public sources taken on 2026-11-20. Re-check every number before publishing. Marketplace numbers change.

## 1. Who

- **Company:** 3s-Soft (styled 3S-SOFT on the current site). eCommerce and web development agency based in Chittagong, Bangladesh.
- **Founder:** Jashedul Islam Shaun (Md. Jashedul Islam Shaun). Founder and lead developer, full-stack developer, eCommerce specialist.
- **UK arm:** 3s-soft.co.uk. UK Director: Minhajul Abedin Toyon.
- **Domains:**
  - 3s-soft.com: main agency site (global)
  - 3s-soft.co.uk: UK market
  - 3s-soft.net: web development (to be repositioned)
- **Contact (HQ):** info@3s-soft.com · +880 1835 927634 (WhatsApp `wa.me/8801835927634`) · Chittagong, Bangladesh
- **Contact (UK):** info@3s-soft.co.uk · +44 7523 759901 · booking at `cal.com/3s-soft-uk/15min`
- **Company socials:** linkedin.com/company/3s-soft · facebook.com/3s.soft.bd · instagram.com/3ssoft
- **Founder socials:** linkedin.com/in/jashedulislamshaun · github.com/shauncuier · jashedulislamshaun.com · instagram.com/jashedulislamshaun · stackoverflow.com/users/30973604

## 2. Verifiable track record

| Fact | Value | Source |
|---|---|---|
| Fiverr profile | @jashedulislam, "Professional Ecommerce Product Listings Expert and B2B Lead Generation Expert" | https://www.fiverr.com/jashedulislam |
| Fiverr rating | **5.0 from 465 reviews** | same |
| Rating breakdown | 5★ 444 · 4★ 14 · 3★ 2 · 2★ 3 · 1★ 2 | same |
| Sub-ratings | Communication 5 · Quality 4.9 · Value 4.9 | same |
| Seller level | **Level 2** | same |
| Selling since | Oct 2015 (11 years 1 month) | same, "Work experience" |
| Response time | About 1 hour | same |
| Reviews with files | 170 | same |
| Gig: Product Upload | 4.9 (220), from $10 | same |
| Gig: B2B Lead Gen / Prospect Lists | 4.8 (118), from $25 | same |
| Gig: Amazon Handmade listing (eCommerce SEO) | 5.0 (98), from $10 | same |
| Gig: Data Entry | 5.0 (14), from $20 | same |
| Total gigs | 8 | same |
| Fiverr portfolio | About 21 projects, for example "Product Addition and Optimization for MONTIQUE" (Amazon, May 2023, $200–400, 7–30 days) | same |
| Upwork freelancer | Md Jashedul Islam S., **Top Rated, 100% Job Success, 55 jobs completed** (page meta); "Completed jobs 32" in the visible history list | https://www.upwork.com/freelancers/~01c75e88b6540d813f |
| Upwork client feedback | 8 visible, for example Fouad L. (Feb 2026, 5.0) and Arye G. (Aug 2022, 5.0) | same |
| Upwork agency | "3s-Soft — eCommerce & Web Development Agency", Top Rated, 100% JSS, $10–15/hr, Chittagong | https://www.upwork.com/agencies/2093425202844360561/ |
| WordPress.org | "3S Soft Price & Stock Sync for Dropshipzone" (WooCommerce ↔ Dropshipzone API) | https://wordpress.org/plugins/3s-soft-price-stock-sync-for-dropshipzone/ |
| Amazon SPN | Listed for Enhanced Brand Content (A+) and Cataloguing | Seller Central SPN, provider id `d0034058-2c31-4502-87f9-c29514841f24` |
| Countries served | "30+" (claim on the UK site) | **To verify** |
| Upwork hours | "2,300+" (claim on the UK site) | **To verify** |

## 3. Real work (portfolio candidates)

| Project | Type | Source |
|---|---|---|
| Ivan Troy | Amazon Brand Story and full A+ Content for the six-colour Ivo croco-embossed belt range (size guide, comparison chart) | 3s-soft.co.uk/work/ivan-troy-amazon-a-plus |
| Tailwater Supply Company | Catalogue-first brand site for an Amazon/Walmart fly-fishing seller | 3s-soft.co.uk/work/tailwater-supply |
| 3S Soft Price & Stock Sync | Our own WooCommerce plugin, published on WordPress.org | 3s-soft.co.uk/work/price-stock-sync |
| MONTIQUE | Amazon store product addition and optimization | Fiverr portfolio |
| Stahl-Design-Tebart | Amazon listing optimization for industrial door hinges (already in `portfolio.json` id 111; image missing) | repo |
| Other Fiverr portfolio items | About 19 more, with delivery screenshots | Fiverr portfolio |
| PortLedger, EmpowHR, ServiceHub Pro | Full-stack apps | `jashedul-portfolio/src/data/projects.json` |
| PlantCareHub, Payora, Doctors Booking, Auction Gallery | Frontend apps | same |

Real client buyers seen in reviews (public on Fiverr): cromwelltoby (US, ongoing collaboration, Amazon + Walmart site), seo_mayhem (US), alertme27 (US), martinberry478 (UK, ongoing).

## 4. Positioning insight

- **Where the proof is:** almost all public proof is **eCommerce operations**: product upload and listing (220 + 98 reviews), lead generation (118) and Amazon A+ (SPN listing). That is what the market buys from 3s-Soft.
- **What the site leads with:** the current 3s-soft.com leads with MERN development, and its "proof" for that is fabricated.
- **Upwork agrees:** the Upwork agency profile already leads with eCommerce and marketplaces, then web development.
- **Decision:** 3s-soft.com leads with eCommerce ops. Web development moves to 3s-soft.net.

## 5. Fake or inflated content inventory

### 3s-soft.com (this repo)

| Item | Where | Problem |
|---|---|---|
| 6 testimonials (Sarah Johnson/TechStart, Michael Chen/EcoShop, Emily Rodriguez/GrowthCo, David Thompson/Local Bistro, Lisa Wang/InnovateLab, Robert Kim/StyleHub) | `src/data/testimonials.json` | Invented people; Pexels stock photos (two reused); "300% / 250% / 400%" claims |
| 12 case studies | `src/data/portfolio.json` ids 1–12 | Invented clients (RetailMax UK, DataDriven Corp, MediCare Solutions, PropertyHub USA, TastyBites Group, StyleVogue London, FitLife Pro, TechVenture Inc, HomeGoods Direct, GreenEnergy Solutions, Luxe Beauty Co, EduTech Academy) with inflated results; every link is `#` |
| Stats "500+ projects", "98% satisfaction", "24/7", "8+ years" | `Home/Hero.jsx` | Unverified; contradicts "5+ years" in `WhyChooseUs.jsx`; counters render `0+` in static HTML |
| "Join hundreds of satisfied clients", "Guaranteed" badges | `FeaturesSection.jsx` | Unverified |
| ".edu/government backlinks" | SEO service copy in `servicesData.js` | Spammy claim; Google-risky |
| Mehedi Hasan Akash photo | `team.json` | Unsplash stock photo |
| 5 team members with `#` social links | `team.json` | Broken links |
| Blog excerpt mismatch | `blogs.json` → `roi-of-virtual-assistants-small-business` | The excerpt is about React |
| Footer email | `Footer.jsx` | Shows info@ but links to `contact@3s-soft.com` |

### Other owned sites (fix in later projects)

| Site | Problem |
|---|---|
| **3s-soft.net** | Section titled "Real reviews collected from our official Fiverr seller profile" shows **6 reviews that are not on Fiverr**: sj_marketing, mchen_eco, emily_growth, david_thompson, lisa_w_startup, robert_kim_sh. Also "500+ projects", "98%", "24/7", "50+ active clients", "185+ reviews". **High risk:** the FTC fake-review rule (2024) and Fiverr's terms of service. Fix first in the .net project. |
| jashedulislamshaun.com | "Fiverr Top Rated Plus" (actually Level 2), "500+ projects", "4.9/5", "Upwork Top Rated Plus" in `upwork_profile_data.md` |
| 3s-soft.co.uk | "185+ reviews" is out of date; the real count is 465 |

## 6. Data conflicts and the rule

**Rule:** publish only what the live public source shows today, with a source link and a checked-on date. If two sources disagree, use the lower verifiable figure or leave the claim out.

| Claim | Conflicting sources | Use |
|---|---|---|
| Upwork badge | Top Rated Plus (old notes) vs Top Rated (live) | **Top Rated** |
| Upwork jobs | 30 (notes) vs 55 (live meta) vs 32 listed | **55 jobs** (live profile meta), linked |
| Fiverr reviews | 185+ (UK, .net) vs 465 (live) | **465** |
| Fiverr level | Top Rated Plus (portfolio site) vs Level 2 (live) | **Level 2**, or don't mention the level |
| Years | 5+ / 8+ (site) vs Oct 2015 (Fiverr) | **"Since 2015"** |

## 7. Current codebase facts (React + Vite, to be replaced)

**Routes** (`src/Router/Router.jsx`):
- Public: `/`, `/services`, `/services/:slug`, `/portfolio`, `/portfolio/:slug`, `/blogs`, `/blog/:slug`, `/team`, `/about-us`, `/contact`
- Legal: `/privacy-policy`, `/terms-of-service`, `/cookies`
- Login: `/login`, `/register`, `/dashboard/*`
- `*` → NotFound

**Integrations:**
- **Contact form:** Formspree `https://formspree.io/f/mgoyrdky` via axios (`src/Pages/Contact/Contact.jsx`). `emailjs-com` is installed but unused.
- **Firebase:** Auth only (email and Google), used for a dashboard whose blog admin posts to an external API the public blog doesn't read. Not needed.
- **Analytics:** GA4 `G-JG742N2K6Z` + Microsoft Clarity (`src/Components/GoogleAnalytics.jsx`; `VITE_CLARITY_PROJECT_ID` in `.env`).

**SEO build** (`scripts/generate-prerendered-pages.mjs` + `scripts/seo-routes.mjs`):
- Writes `dist/<route>/index.html` with meta tags and a hidden SEO body, plus a 46-URL sitemap.
- Has `public/llms.txt` and `public/llms-full.txt`.

**Hosting:**
- `public/.htaccess`: HTTPS, SPA fallback, cache headers, gzip.
- `netlify.toml` and `_redirects` are a parallel config that isn't needed.

**Service slugs:** `web-development-mern`, `wordpress-customization`, `ecommerce-product-listing`, `lead-generation`, `digital-marketing-seo`, `social-media-marketing`, `graphic-design`, `virtual-assistant`.

**Team** (`src/data/team.json`, 9):
- Jashedul Islam Shaun (Founder & CEO)
- Oahidul Islam Sajib (Co-Founder & Creative Director)
- Rakibul Hasan (Senior Front End Developer)
- Maptaul Islam Taraq (Full Stack Developer)
- Minhajul Abedin (Marketing Executive; becomes UK Director Minhajul Abedin Toyon)
- Borhan Siddque (Frontend Developer)
- Md. Shahidul Islam (Digital Marketing Specialist; photo file is `Shamim.webp`)
- Mehedi Hasan Akash (UI/UX & Graphic Designer; stock photo)
- Fariya Rahman (Data Entry Specialist)

**Deleted file:** `public/assets/team-profile/maptahul_taraq.webp`. It is unused; Maptaul's real photo is `Maptaul_Islam_Taraq.webp`.
