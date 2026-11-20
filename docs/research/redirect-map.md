# Redirect Map (old → new)

Every one of these is a **301**, implemented in `public/.htaccess`. Paths use trailing slashes because `trailingSlash: true` is set.

## Kept URLs (no redirect)

- `/` · `/services/` · `/portfolio/` · `/blogs/` · `/team/` · `/about-us/` · `/contact/`
- `/privacy-policy/` · `/terms-of-service/` · `/cookies/`
- `/services/ecommerce-product-listing/` · `/services/lead-generation/` · `/services/virtual-assistant/`
- `/portfolio/stahl-design-tebart-amazon-listing-optimization/`
- Kept blogs (see below)

## New URLs

- `/services/amazon-a-plus-content/`
- `/services/shopify-store-management/`
- `/reviews/`
- `/free-listing-audit/`
- `/portfolio/ivan-troy-amazon-a-plus/`
- `/portfolio/montique-amazon-store/`
- `/portfolio/tailwater-supply/`
- More real case studies can be added, with slugs chosen by the builder.

## Services

| Old | New |
|---|---|
| `/services/digital-marketing-seo` | `/services/ecommerce-product-listing/` |
| `/services/graphic-design` | `/services/amazon-a-plus-content/` |
| `/services/social-media-marketing` | `/services/` |
| `/services/web-development-mern` | `https://3s-soft.net/services/` (point it at the exact .net page after the .net project) |
| `/services/wordpress-customization` | `https://3s-soft.net/services/` (same note) |

## Portfolio (fake case studies removed)

| Old | New |
|---|---|
| `/portfolio/ecommerce-platform-retailmax` | `/portfolio/` |
| `/portfolio/business-analytics-dashboard-datadriven` | `/portfolio/` |
| `/portfolio/healthcare-portal-medicare` | `/portfolio/` |
| `/portfolio/real-estate-platform-propertyhub` | `/portfolio/` |
| `/portfolio/restaurant-chain-website-tastybites` | `/portfolio/` |
| `/portfolio/fashion-brand-store-stylevogue` | `/portfolio/` |
| `/portfolio/fitness-tracking-app-fitlife` | `/portfolio/` |
| `/portfolio/corporate-branding-suite-techventure` | `/portfolio/` |
| `/portfolio/amazon-marketplace-optimization-homegoods` | `/portfolio/` |
| `/portfolio/seo-digital-marketing-greenenergy` | `/portfolio/` |
| `/portfolio/social-media-campaign-luxe-beauty` | `/portfolio/` |
| `/portfolio/educational-learning-platform-edutech` | `/portfolio/` |

## Blog

**Kept** (6, eCommerce focus). These are builder's calls and the owner can swap them. Each kept post is fact-checked, cleaned of any unverifiable claims, and linked to its service and a case study.

| Slug | Original author | Links to |
|---|---|---|
| `amazon-global-selling-strategies-uk-us` | Rakibul Hasan | ecommerce-product-listing, amazon-a-plus-content |
| `ecommerce-product-optimization-conversions` | Maptaul Islam Taraq | ecommerce-product-listing |
| `shopify-scaling-strategies-2026` | Jashedul Islam Shaun | shopify-store-management |
| `maximizing-ecommerce-revenue-amazon-shopify-2026` | Jashedul Islam Shaun | ecommerce-product-listing |
| `linkedin-lead-generation-b2b-usa` | Borhan Siddque | lead-generation |
| `roi-of-virtual-assistants-small-business` (fix the React excerpt) | Rakibul Hasan | virtual-assistant |

**Redirected:**

| Old | New |
|---|---|
| `/blog/mern-stack-scalable-web-applications-2026` | `https://3s-soft.net/` (move to the .net blog later) |
| `/blog/wordpress-security-best-practices-2026` | `https://3s-soft.net/` (move to the .net blog later) |
| `/blog/ai-powered-web-development-next-frontier` | `https://3s-soft.net/` |
| `/blog/advanced-seo-audit-checklist-uk` | `/services/ecommerce-product-listing/` |
| `/blog/digital-transformation-roadmap-2026` | `/services/` |
| `/blog/full-stack-digital-marketing-roi` | `/services/` |
| `/blog/3s-soft-engineering-advantage-global-success` | `/about-us/` |
| `/blog/best-software-company-in-chittagong-3s-soft` | `/about-us/` |
| `/blog/b2b-lead-generation-virtual-assistants-roi` | `/services/lead-generation/` |

Keep the source text of the .net-bound posts in `docs/archive/` so the .net project can reuse it.

## Removed app routes

| Old | New |
|---|---|
| `/login`, `/register` | `/contact/` |
| `/dashboard` and everything under it | `/` |

## .htaccess sketch

```apache
RewriteEngine On
# Force HTTPS + bare domain
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://3s-soft.com%{REQUEST_URI} [L,R=301]

# Examples (full list generated from this map)
Redirect 301 /services/graphic-design /services/amazon-a-plus-content/
Redirect 301 /portfolio/ecommerce-platform-retailmax /portfolio/
Redirect 301 /services/web-development-mern https://3s-soft.net/services/

ErrorDocument 404 /404.html
```

Each `Redirect` rule must match the old path both with and without a trailing slash. Prefer `RedirectMatch 301 ^/old/?$ /new/`.
