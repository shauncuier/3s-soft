# Domain Strategy: 3s-soft.com / .co.uk / .net

Decided 2026-11-20. The sites are fixed one at a time: **.com first**, then .net, then .co.uk.

## Roles

| Domain | Role | Audience | Leads with | Status |
|---|---|---|---|---|
| **3s-soft.com** | Main agency (global HQ) | Marketplace sellers and brands, global (US first) | eCommerce operations: listings, A+ Content, catalogue, Shopify, lead gen | **Redesign now** (this project) |
| **3s-soft.co.uk** | UK market | UK businesses | eCommerce support + website development, UK point of contact | Mostly honest already; update the review count later |
| **3s-soft.net** | Web development studio | Businesses needing store sites, WooCommerce, Next.js/MERN apps | Web development + the WordPress.org plugin | Needs a reposition and a fake-review removal (next project) |

## Cross-linking rules

- **.com → .net:** a "Websites & development" teaser section, plus web portfolio cards that link out. The old .com web-dev URLs 301 to .net.
- **.com → .co.uk:** the footer, the About and Contact pages ("UK clients: 3s-soft.co.uk"), and the UK Director card on `/team`.
- **.net and .co.uk → .com:** "Part of 3s-Soft" in the footer; marketplace and eCommerce ops services link back to .com.
- **One fact sheet:** all three sites use the same proof numbers. In the long run, keep one `proof` data file and copy it into each site.

## Duplicate-content rules

- **One topic, one domain.** Example: the Amazon listing service lives only on .com. The .co.uk site may have a UK-angled version written in its own words, not copied text.
- No copied page text between domains. Case studies may appear on two sites only if one copy is a short summary that links to the full study.
- Each site's canonical tags point to itself. Never set a cross-domain canonical unless a page truly is a duplicate.
- Use hreflang only if .co.uk and .com end up carrying equivalent pages (`en-GB` ↔ `en`). Not needed at launch.

## Urgent finding on .net (do first in the .net project)

The 3s-soft.net homepage has a section titled "Real reviews collected from our official Fiverr seller profile". It shows six reviews that do not exist on the Fiverr profile: sj_marketing, mchen_eco, emily_growth, david_thompson, lisa_w_startup, robert_kim_sh. It also shows "500+ projects", "98%", "24/7", "50+ active clients" and "185+ reviews".

Risk:
- the US FTC rule on fake reviews and testimonials (2024), which carries civil penalties
- Fiverr's terms of service
- the trust of any prospect who checks the Fiverr profile

Fix: remove the section and the stats, and replace them with the real proof block (5.0★ from 465 reviews, linked).

## Platform terms (all sites)

- Show Fiverr and Upwork neutrally ("Also available on…").
- Never say "avoid platform fees".
- Never invite buyers you met on Fiverr or Upwork to work off-platform.
- Reviews may show the public username, country and date, with a link to the source.
